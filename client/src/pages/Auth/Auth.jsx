import { Outlet } from "react-router-dom";


import s from "./Auth.module.css";

function Auth({ title }) {
  return (
    <div className={s.wrapper}>
      <div className={s.popup}>
        <h1 className={s.title}>{title}</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;