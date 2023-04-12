import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function LandingPage({ dispatch }) {
  return (
      <div className="wrapper">
        <Header dispatch={dispatch} />
        <Outlet />
        <Footer />
      </div>
  );
};

export default LandingPage;