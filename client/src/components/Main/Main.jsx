import React from "react";
import s from "./Main.module.css"
import { Link } from "react-router-dom";
import { AppRoute } from "../../common/constants";

function Main({ filmList }) {
   return (
      <main className={s.main}>
         <div className={s.content}>
            <h1 className={s.contentTitle}>Title</h1>
            <div className={s.films}>
               {
                  filmList.map(({ id, name, img }) => (
                     <div className={s.filmItem} key={id}>
                        <Link className={s.filmImage} to={AppRoute.FILMS + `/${id}`}>
                           <img src={img} alt="Film" />
                        </Link>
                        <Link className={s.filmName} to={AppRoute.FILMS + `/${id}`}>
                           {name}
                        </Link>
                     </div>
                  ))
               }
            </div>
         </div>
      </main>
   );
}

export default Main; 