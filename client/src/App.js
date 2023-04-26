import { useReducer, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AppRoute, ApiPath } from './common/constants';
import { filmsReducer } from './reducer/reducer';

import LandingPage from './pages/LandingPage';
import Main from './components/Main/Main';
import About from './components/About/About';
import FilmDetails from './components/FilmDetails/FilmDetails';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export let filmsInitialState = [];

function App() {
  const [films, dispatch] = useReducer(filmsReducer, filmsInitialState);

  useEffect(() => {
    fetch(ApiPath.videoList)
      .then(res => res.json())
      .then(body => { 
        dispatch({ type: 'fetch_success', payload: body });
        filmsInitialState = body;
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.MAIN} element={
          <LandingPage dispatch={dispatch} />
        }>
          <Route index element={<Main filmList={films} />} />
          <Route path={AppRoute.FILMS + AppRoute.$ID} element={<FilmDetails />} />
        </Route>
        <Route path={AppRoute.ABOUT} element={
          <LandingPage dispatch={dispatch} />
        }>
          <Route index element={<About />} />
        </Route>
        <Route path={AppRoute.NOT_FOUND} element={<Navigate to={AppRoute.MAIN} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;