import { useContext, useEffect, useState } from "react";

import { useHttp } from "../../hooks/hooks";

import { PopupContex, UserContext, VideoContext } from "../../context/context";

import { ApiPath } from "../../common/constants";

import s from "./VerificationDetail.module.css";


function VerificationDetail({ id }) {
  const { user } = useContext(UserContext);
  const { video, setVideo } = useContext(VideoContext)
  const { setPopupContext } = useContext(PopupContex);
  const { request } = useHttp();
  const [verificationDetail, setVerificationDetail] = useState(null);


  useEffect(() => {
    request(`${ApiPath.verificationGet}${id}`, "GET", null, null, user.token)
      .then(res => {
        console.log(res);
        setVerificationDetail(res)
      })
      .catch(e => console.log(e));
  }, [])

  const declineVideo = () => {
    request(ApiPath.verificationDelete, "POST", { id: verificationDetail.id })
      .then((res) => setPopupContext(state => ({ ...state, isOpen: false })))
      .catch(e => console.log(e));
  };

  const onSuccess = (res) => {
    setVideo(state => ({ ...state, list: state.list.concat([res]) }))

    request(ApiPath.ratingCreate, "POST", { video_id: res.id })
      .then()
      .catch(e => console.log(e));
    declineVideo();
  }

  const acceptVideo = () => {
    const regEx = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const { link } = verificationDetail;
    const videoId = link.match(regEx)[2];
    const videoLink = "https://www.youtube.com/embed/" + videoId;
    const preview = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    const { name, genreId, description } = verificationDetail;
    const body = { name, genreId, description, videoLink, preview };
    request(ApiPath.videoCreate, "POST", body)
      .then(onSuccess)
      .catch(e => console.log(e));
  }

  return (
    <>
      <h2 className={s.title}>Verification detail</h2>
      {verificationDetail && (
        <div className={s.wrapper}>
          <div className={s.field}>
            <p className={s.label}>Name</p>
            <p className={s.data}>{verificationDetail.name}</p>
          </div>
          <div className={s.field}>
            <p className={s.label}>Link</p>
            <p className={s.data}>{verificationDetail.link}</p>
          </div>
          <div className={s.field}>
            <p className={s.label}>Description</p>
            <p className={s.description}>{verificationDetail.description}</p>
          </div>
          <div className={s.field}>
            <span className={s.creator}>{verificationDetail.creator}</span>
            <button onClick={declineVideo} className={s.btnDecline}>decline</button>
            <button onClick={acceptVideo} className={s.btnAccept}>accept</button>
          </div>
        </div>
      )}
    </>
  )
}

export default VerificationDetail