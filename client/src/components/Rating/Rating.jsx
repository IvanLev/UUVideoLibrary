import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { ApiPath, AppRoute } from "../../common/constants";
import { UserContext } from "../../context/context";

import { useHttp } from "../../hooks/hooks";

import s from "./Rating.module.css";



function Rating() {
  const { filmId } = useParams();
  const { request, error } = useHttp();
  const navigate = useNavigate()
  const { user, saveUser } = useContext(UserContext)
  const [data, setData] = useState({});

  const likePath = "/img/like-L.png";
  const dislikePath = "/img/dislike-L.png";
  const activeLikePath = "/img/active-like-L.png";
  const activeDislikePath = "/img/active-dislike-L.png";

  const handleRateFilm = (e) => {
    if (!user) {
      navigate(AppRoute.SIGN_IN);

    } else {
      const field = e.target.alt;
      const { id } = e.target.dataset;
      const { likes, dislikes } = data;
      const userRating = {};
      const filmRateCount = { likes, dislikes };
      for (const item in user.films) {
        const filmIdList = user.films[item];
        const isIncludes = filmIdList.includes(id);
        if (isIncludes) {
          userRating[item] = filmIdList.filter(filmId => filmId !== id);
          filmRateCount[item] -= 1;
        } else if (field === item) {
          userRating[item] = filmIdList.concat([id]);
          filmRateCount[item] += 1;
        } else {
          userRating[item] = filmIdList;
        }
      }
      const quantityRate = filmRateCount.likes + filmRateCount.dislikes;
      const rating = quantityRate ? +((filmRateCount.likes / quantityRate) * 5).toFixed(1) : 0;
      saveUser({ ...user, films: userRating });
      setData(state => ({ ...state, rating, ...filmRateCount }));
      request(ApiPath.userUpdate, "POST", { films: userRating }, null, user.token)
        .then(res => res)
        .catch(e => console.log(e))
      request(ApiPath.ratingUpdate, "POST", { ...filmRateCount, id, rating })
        .then(res => res)
        .catch(e => console.log(e))
    }
  }

  useEffect(() => {
    request(`${ApiPath.ratingGet}${filmId}`)
      .then(res => setData(res))
      .catch(e => console.log(e));
  }, [])

  return (
    <div className={s.wrapper}>
      <div className={s.ratingWrapper}>
        <span className={s.likes}>
          <img
            onClick={handleRateFilm}
            src={user?.films.likes.includes(data.id) ? activeLikePath : likePath}
            className={s.icon}
            alt="likes"
            data-id={data.id}
          />
          <span className={s.count}>{data.likes}</span>
        </span>
        <span className={s.rating}>{data.rating}</span>
        <span className={s.dislikes}>
          <img
            onClick={handleRateFilm}
            src={user?.films.dislikes.includes(data.id) ? activeDislikePath : dislikePath}
            className={s.icon}
            alt="dislikes"
            data-id={data.id}
          />
          <span className={s.count}>{data.dislikes}</span>
        </span>
      </div>
    </div>
  );
};

export default Rating;