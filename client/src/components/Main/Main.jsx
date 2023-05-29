import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ApiPath, AppRoute } from "../../common/constants";
import { PopupContex, UserContext, VideoContext } from "../../context/context";
import { useHttp } from "../../hooks/hooks";
import s from "./Main.module.css";

function Main() {
   const [allRatings, setAllRatings] = useState([]);
   const { user } = useContext(UserContext);
   const [count, setCount] = useState(10)
   const { video, setVideo } = useContext(VideoContext);
   const { isOpen, activeComponent, props, setPopupContext } = useContext(PopupContex)
   const { request } = useHttp();

   useEffect(() => {
      request(ApiPath.ratingList)
         .then(res => setAllRatings(res))
         .catch(e => console.log(e))
   }, [])



   const deleteVideo = (e) => {
      const { id } = e.target;

      const yesOnClick = async () => {
         try {
            const { video_id } = await request(ApiPath.videoDelete, "POST", { id });
            await request(ApiPath.commentDelete, "POST", { video_id });
            await request(ApiPath.ratingDelete, "POST", { video_id });

            const list = video.list.filter(film => film.id !== video_id);
            setVideo(state => ({ ...state, list }))
         } catch (e) {
            console.log(e)
         }
      }

      const { name } = video.list.find(item => item.id === id)

      setPopupContext(state => ({
         ...state,
         isOpen: true,
         activeComponent: 'deleteConfirm',
         props: {
            title: `Do you want delete "${name}" video ?`,
            yesOnClick
         }
      }))
   }

   const loadMore = () => {
      const newCount = count + 10;
      let params = new URLSearchParams(window.location.search);
      params.set('genre', video.filter.genre);
      params.set('search', video.filter.search);
      params.set('count', String(newCount));
      request(`${ApiPath.videoList}?${params}`)
         .then(res => {
            setVideo(state => ({ ...state, ...res }));
            setCount(newCount)
         })
         .catch(e => console.log(e))
   }

   return (
      <main className={s.main}>
         <div className={s.content}>
            <h1 className={s.contentTitle}>Title</h1>
            <div className={s.films}>
               {
                  video.list.map(({ id, name, preview }) => (
                     <div className={s.filmItem} key={id}>
                        {user?.role === "admin" && (
                           <Button
                              className={s.deleteBtn}
                              id={id}
                              variant="danger"
                              onClick={deleteVideo}
                           >
                              delete
                           </Button>
                        )}
                        <Link className={s.filmImage} to={AppRoute.FILMS + `/${id}`}>
                           <img src={preview} alt="YT" />
                           <span className={s.ratingWrapper}>
                              <span className={s.rating}>
                                 {allRatings.find(item => item.video_id === id)?.rating || 0}
                              </span>
                           </span>
                        </Link>
                        <Link className={s.filmName} to={AppRoute.FILMS + `/${id}`}>
                           {name}
                        </Link>
                     </div>
                  ))
               }
            </div>
            {video.lastNum > count && (
               <div className={s.btnGroup}>
                  <Button onClick={loadMore} size="lg" >Load more</Button>
               </div>
            )}
         </div>
      </main>
   );
}

export default Main; 