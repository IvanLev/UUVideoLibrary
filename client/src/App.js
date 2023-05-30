import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ApiPath, AppRoute } from './common/constants';
import { ContextProvider, VideoContext } from './context/context';

import About from './components/About/About';
import FilmDetails from './components/FilmDetails/FilmDetails';
import Main from './components/Main/Main';
import Auth from './pages/Auth/Auth';
import LandingPage from './pages/LandingPage/LandingPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { useHttp } from './hooks/hooks';


export let videoInitialState = {
  list: [],
  lastNum: 0,
  filter: {
    genre: "",
    search: ""
  }
};

function App() {
  const { request } = useHttp()
  const [video, setVideo] = useState(videoInitialState);

  // useEffect(() => {
  //   request(`${ApiPath.videoList}?count=10`)
  //     .then(body => setVideo(state => ({ ...state, ...body })))
  //     .catch(error => console.log(error))
  // }, [])

  return (
    <ContextProvider>
      <VideoContext.Provider value={{ video, setVideo }}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.MAIN} element={
              <LandingPage />
            }>
              <Route index element={<Main />} />
              <Route path="/:genreId" element={<Main />} />
              <Route path={AppRoute.FILMS + AppRoute.$ID} element={<FilmDetails />} />
            </Route>
            <Route path={AppRoute.ABOUT} element={
              <LandingPage />
            }>
              <Route index element={<About />} />
            </Route>
            <Route path={AppRoute.SIGN_IN} element={<Auth title="sign in" />}>
              <Route index element={<SignIn />} />
            </Route>
            <Route path={AppRoute.SIGN_UP} element={<Auth title="sign up" />}>
              <Route index element={<SignUp />} />
            </Route>
            <Route path={AppRoute.NOT_FOUND} element={<Navigate to={AppRoute.MAIN} />} />
          </Routes>
        </BrowserRouter>
      </VideoContext.Provider>
    </ContextProvider>
  );
}

export default App;