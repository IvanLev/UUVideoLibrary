import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';

import {
   Button,
   Container,
   Form,
   Nav,
   Navbar,
   NavDropdown
} from 'react-bootstrap';


import { ApiPath, AppRoute } from '../../common/constants';

import { PopupContex, UserContext, VideoContext } from '../../context/context';
import { useHttp } from '../../hooks/hooks';
import s from './Header.module.css';

function Header() {
   const navigate = useNavigate()
   const { request } = useHttp();
   const [genreList, setGenreList] = useState([]);
   const [searchValue, setSearchValue] = useState('');
   const { user, saveUser } = useContext(UserContext);
   const { video, setVideo } = useContext(VideoContext);
   const { setPopupContext } = useContext(PopupContex);

   const avatar = user?.imgPath ? `/images/${user.imgPath}` : `/img/user-img.webp`;

   useEffect(() => {
      request(ApiPath.genreList)
         .then(body => setGenreList(body))
         .catch(error => console.log(error))
   }, [])

   const handleChange = (e) => {
      if (!e.target.value) {
         setVideo(state => ({ ...state, filter: { ...state.filter, search: '' } }))
         sendFilterRequest('', video.filter.genre);
      }
      setSearchValue(e.target.value);
   }

   const sendFilterRequest = (search, genre) => {
      let params = new URLSearchParams(window.location.search);
      params.set('genre', genre);
      params.set('search', search);
      params.set('count', 10);
      request(`${ApiPath.videoList}?${params}`)
         .then(res => setVideo(state => ({ ...state, ...res, filter: { search, genre } })))
         .catch(e => console.log(e));
   }



   const handleSearchClick = () => {
      sendFilterRequest(searchValue, video.filter.genre);
   }

   const handleFilterClick = (eventKey) => {
      navigate(`/${eventKey}`);
   }

   const handleResetFilterClick = () => {
      sendFilterRequest('', '');
   }

   const handleLogOut = () => {
      saveUser(null)
   }

   const openPopup = (e) => {
      const field = e.target.name;
      setPopupContext(state => ({ isOpen: true, activeComponent: field }))
   }

   const openEditProfile = (e) => {
      const field = e.currentTarget.id;
      setPopupContext(state => ({ isOpen: true, activeComponent: field }))
   }

   return (
      <Navbar className={s.header} expand="lg">
         <Container>
            <LinkContainer to={AppRoute.MAIN} onClick={handleResetFilterClick}>
               <Navbar.Brand>
                  <img src='/img/uuVideoLOGO.png' width={70} alt='logo' />
               </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto my-2 my-lg-0">
                  <LinkContainer to={AppRoute.MAIN} onClick={handleResetFilterClick}>
                     <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={AppRoute.ABOUT}>
                     <Nav.Link>About</Nav.Link>
                  </LinkContainer>
                  <NavDropdown title="Genres" id="basic-nav-dropdown" onSelect={handleFilterClick}>
                     <NavDropdown.Item eventKey="">All</NavDropdown.Item>
                     {genreList.map(({ name, id }) => (
                        <NavDropdown.Item eventKey={id} key={id}>
                              {name}
                        </NavDropdown.Item>
                     ))}
                  </NavDropdown>
                  {user ? (
                     <LinkContainer to={AppRoute.MAIN} onClick={handleLogOut}>
                        <Nav.Link>Log out</Nav.Link>
                     </LinkContainer>
                  ) : (
                     <>
                        <LinkContainer to={AppRoute.SIGN_IN}>
                           <Nav.Link>Sign In</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={AppRoute.SIGN_UP}>
                           <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer>
                     </>
                  )}

               </Nav>
               <Form className="d-flex">
                  <Form.Control
                     value={searchValue}
                     type="search"
                     placeholder="Search"
                     className="me-2"
                     aria-label="Search"
                     onChange={handleChange}
                  />
                  <Button
                     variant="outline-dark"
                     onClick={handleSearchClick}
                  >
                     Search
                  </Button>
               </Form>
               {user?.role === "content creator" && (
                  <Button
                     className={s.uploadBtn}
                     name="upload"
                     variant="success"
                     onClick={openPopup}
                  >
                     upload video
                  </Button>
               )}
               {user?.role === "admin" && (
                  <Button
                     className={s.uploadBtn}
                     name="verification"
                     variant="success"
                     onClick={openPopup}
                  >
                     verification
                  </Button>
               )}

               {user && (
                  <div className={s.avatarWrapper} id="edit" onClick={openEditProfile}>
                     <img src={avatar} alt="avatar" />
                  </div>
               )}
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default Header;