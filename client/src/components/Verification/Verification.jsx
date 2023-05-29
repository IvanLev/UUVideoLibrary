import { useContext, useEffect, useState } from "react";

import { useHttp } from "../../hooks/hooks";

import { PopupContex, UserContext } from "../../context/context";

import { ApiPath } from "../../common/constants";

import s from "./Verification.module.css";


function Verification() {
  const { user } = useContext(UserContext);
  const { setPopupContext } = useContext(PopupContex);
  const { request } = useHttp();
  const [verificationList, setVerificationList] = useState([]);

  const verificationDetail = (id) => {
    setPopupContext(state => ({ ...state, activeComponent: 'detail', props: { id } }))
  }

  useEffect(() => {
    request(ApiPath.verificationList, "GET", null, null, user.token)
      .then(res => setVerificationList(res))
      .catch(e => console.log(e));
  }, [])

  return (
    <>
      <h2 className={s.title}>Verification list</h2>
      <ul className={s.verificationList}>
        {verificationList.map(({ name, date, link, creator, id }) => (
          <li key={id} className={s.verificationItem} onClick={() => verificationDetail(id)}>
            <div className={s.verificationWrapper}>
              <span className={s.name}>{name}</span>
              <span className={s.creator}>{creator}</span>
              <span className={s.date}>{date}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Verification