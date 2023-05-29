import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import EditProfile from '../../components/EditProfile/EditProfile';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm';
import Popup from '../../components/Popup/Popup';
import UploadVideo from '../../components/UploadVideo/UploadVideo';
import Verification from '../../components/Verification/Verification';
import VerificationDetail from '../../components/VerificationDetail/VerificationDetail';
import { PopupContex } from '../../context/context';

function LandingPage() {
  const [popupContext, setPopupContext] = useState({
    isOpen: false,
    activeComponent: '',
    props: null
  })

  return (
    <PopupContex.Provider value={{ ...popupContext, setPopupContext }}>
      <div className="wrapper">
        <Header />
        <Outlet />
        <Footer />
        {popupContext.isOpen && (
          <Popup>
            {popupContext.activeComponent === 'upload' && <UploadVideo />}
            {popupContext.activeComponent === 'verification' && <Verification />}
            {popupContext.activeComponent === 'detail' && <VerificationDetail {...popupContext.props} />}
            {popupContext.activeComponent === 'deleteConfirm' && <ModalConfirm {...popupContext.props} />}
            {popupContext.activeComponent === 'edit' && <EditProfile />}
          </Popup>
        )}
      </div>
    </PopupContex.Provider>
  );
};

export default LandingPage;