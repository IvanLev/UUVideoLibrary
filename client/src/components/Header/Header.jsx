import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import {
   Button,
   Container,
   Form,
   Nav,
   Navbar,
   NavDropdown
} from 'react-bootstrap';

import { AppRoute, ApiPath } from '../../common/constants';

import s from './Header.module.css';

function Header({ dispatch }) {
   const [genreList, setGenreList] = useState([]);
   const [searchValue, setSearchValue] = useState('');

   useEffect(() => {
      fetch(ApiPath.genreList)
         .then(res => res.json())
         .then(body => setGenreList(body))
         .catch(error => console.log(error))
   },[])

   const handleChange = (e) => {
      if (!e.target.value) dispatch({ type: '' });
      setSearchValue(e.target.value);
   }

   const handleSearchClick = () => {
      dispatch({ type: 'searching', value: searchValue });
   }

   const handleFilterClick = (eventKey) => {
      if(eventKey === "all") {   
         dispatch({})
      } else {
         dispatch({ type: 'filter_by_genre', payload: eventKey })
      }
   }

   const handleResetFilterClick = () => {
      dispatch({})
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
                     <NavDropdown.Item eventKey="all">All</NavDropdown.Item>
                     {genreList.map(({name, id}) => (
                        <NavDropdown.Item eventKey={id} key={id}>{name}</NavDropdown.Item>
                     ))}
                     {/* <NavDropdown.Item eventKey="programming">
                        Programming
                     </NavDropdown.Item>
                     <NavDropdown.Item eventKey="language">
                        Language
                     </NavDropdown.Item>
                     <NavDropdown.Item eventKey="guides">
                        Guides
                     </NavDropdown.Item> */}
                  </NavDropdown>
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
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default Header;

