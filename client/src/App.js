import { useReducer } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AppRoute } from './common/constants';
import { filmsReducer } from './reducer/reducer';

import LandingPage from './pages/LandingPage';
import Main from './components/Main/Main';
import FilmDetails from './components/FilmDetails/FilmDetails';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const filmsInitialState = [
  {
    id: '1',
    name: 'Avengers: Endgame',
    url: 'https://www.youtube.com/embed/TcMBFSGVi1c',
    img: '/img/filmPreimage/avengers.jpg',
    genre: 'smth',
    description: "After the devastating events of Мстители: Война бесконечности (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe."
  },
  {
    id: '2',
    name: 'The Lord of the Rings: The Fellowship of the Ring',
    url: 'https://www.youtube.com/embed/V75dMMIW2B4',
    img: '/img/filmPreimage/LOTR.jpg',
    genre: 'smth',
    description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.'
  },
  {
    id: '3',
    name: 'John Wick: Chapter 4',
    url: 'https://www.youtube.com/embed/yjRHZEUamCc',
    img: '/img/filmPreimage/JohnWick4.jpg',
    genre: 'smth',
    description: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.'
  },
  {
    id: '4',
    name: 'Pirates of the Caribbean: The Curse of the Black Pearl',
    url: 'https://www.youtube.com/embed/naQr0uTrH_s',
    img: '/img/filmPreimage/pirates.jpg',
    genre: 'smth',
    description: `Blacksmith Will Turner teams up with eccentric pirate "Captain" Jack Sparrow to save his love, the governor's daughter, from Jack's former pirate allies, who are now undead.`
  }
];

function App() {
  const [films, dispatch] = useReducer(filmsReducer, filmsInitialState);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.MAIN} element={
          <LandingPage dispatch={dispatch} />
        }>
          <Route index element={<Main filmList={films} />} />
          <Route path={AppRoute.FILMS + AppRoute.$ID} element={<FilmDetails />} />
        </Route>
        <Route path={AppRoute.NOT_FOUND} element={<Navigate to={AppRoute.MAIN} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;