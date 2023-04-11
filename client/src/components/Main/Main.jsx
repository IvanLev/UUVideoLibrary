import React from "react";
import s from "./Main.module.css"

function Main(){
   return(
      <main className={s.main}>
         <div className={s.content}>
            <h1 className={s.contentTitle}>Title</h1>
            <div className={s.films}>
               <div className={s.filmItem}>
                  <a href="" className={s.filmImage}>
                     <img src="/img/filmPreimage/JohnWick4.jpg" alt="Film" />
                  </a>
                  <a href="" class={s.filmName}>John Wick: Chapter 4</a>
               </div>
               <div className={s.filmItem}>
                  <a href="" className={s.filmImage}>
                     <img src="/img/filmPreimage/JohnWick4.jpg" alt="Film" />
                  </a>
                  <a href="" class={s.filmName}>John Wick: Chapter 4</a>
               </div>
               <div className={s.filmItem}>
                  <a href="" className={s.filmImage}>
                     <img src="/img/filmPreimage/JohnWick4.jpg" alt="Film" />
                  </a>
                  <a href="" class={s.filmName}>John Wick: Chapter 4</a>
               </div>
               <div className={s.filmItem}>
                  <a href="" className={s.filmImage}>
                     <img src="/img/filmPreimage/JohnWick4.jpg" alt="Film" />
                  </a>
                  <a href="" class={s.filmName}>John Wick: Chapter 4</a>
               </div>
               <div className={s.filmItem}>
                  <a href="" className={s.filmImage}>
                     <img src="/img/filmPreimage/JohnWick4.jpg" alt="Film" />
                  </a>
                  <a href="" class={s.filmName}>John Wick: Chapter 4</a>
               </div>
            </div>
         </div>
      </main>
   );
}

export default Main; 