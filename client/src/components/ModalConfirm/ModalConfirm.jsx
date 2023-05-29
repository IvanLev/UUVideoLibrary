import { useContext } from "react";
import { Button } from "react-bootstrap";

import { PopupContex } from "../../context/context";

import s from "./ModalConfirm.module.css";



function ModalConfirm({ title, yesOnClick }) {
  const { setPopupContext } = useContext(PopupContex);

  const onClick = async (e) => {
    const { id } = e.target;
    if (id === "yes") {
      await yesOnClick();
    }
    setPopupContext(state => ({ ...state, isOpen: false }))
  }

  return (
    <>
      <h2 className={s.title}>{title}</h2>
      <div className={s.btnGroup}>
        <Button className={s.btn} variant="danger" id="no" onClick={onClick}>no</Button>
        <Button className={s.btn} variant="success" id="yes" onClick={onClick}>yes</Button>
      </div>
    </>
  )
}

export default ModalConfirm;