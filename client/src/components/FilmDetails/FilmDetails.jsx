import { useParams } from 'react-router-dom';

import { filmsInitialState } from '../../App';

import s from './FIlmDetails.module.css'

function FilmDetails() {
   const { filmId } = useParams();

   const currentFilm = filmsInitialState.find(({ id }) => id === filmId);

   if (!currentFilm) {
      return (
         <h1>Film not found</h1>
      )
   }

   return (
      <main className={s.main}>
         <div className={s.content}>
            <h1 className={s.contentTitle}>{currentFilm.name}</h1>
            <div className={s.filmContent}>
               <iframe
                  className={s.filmFrame}
                  src={currentFilm.url}
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