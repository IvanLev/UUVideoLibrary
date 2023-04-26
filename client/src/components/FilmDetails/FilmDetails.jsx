import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ApiPath } from '../../common/constants';

import s from './FIlmDetails.module.css'

function FilmDetails() {
   const { filmId } = useParams();
   const [currentFilm, setCurrentFilm] = useState(null);

   useEffect(() => {
      fetch(ApiPath.videoById + filmId)
         .then(res => res.json())
         .then(body => setCurrentFilm(body))
         .catch(error => console.log(error))
   })

   if (!currentFilm) {
      return null;
   }

   return (
      <main className={s.main}>
         <div className={s.content}>
            <h1 className={s.contentTitle}>{currentFilm.name}</h1>
            <div className={s.filmContent}>
               <iframe
                  className={s.filmFrame}
                  src={`https://www.youtube.com/embed/${currentFilm.videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
               >
               </iframe>
               <p className={s.filmDescription}>
                  {currentFilm.description}
               </p>
            </div>
         </div>
      </main>
   );
}

export default FilmDetails;