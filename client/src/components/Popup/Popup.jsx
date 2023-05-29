import { useContext } from "react";
import { PopupContex } from "../../context/context";
import s from "./Popup.module.css";


function Popup({ children }) {
  const { setPopupContext } = useContext(PopupContex)
  const handleClosePopup = (e) => {
    setPopupContext(state => ({ ...state, isOpen: false }))
  }
  return (
    <div className={s.wrapper} onClick={handleClosePopup}>
      <div className={s.popup} onClick={(e) => e.stopPropagation()}>
        <span className={s.close} onClick={handleClosePopup}>
          <img src="/img/close.png" alt="close" />
        </span>
        {children}
      </div>
    </div>
  )
};

export default Popup;