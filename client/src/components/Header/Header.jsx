import { useState } from 'react';

import {
   Button,
   Container,
   Form,
   Nav,
   Navbar,
   NavDropdown
} from 'react-bootstrap';

import s from './Header.module.css';

function Header({ dispatch }) {
   const [searchValue, setSearchValue] = useState('');

   const handleChange = (e) => {
      if (!e.target.value) dispatch({ type: '' });
      setSearchValue(e.target.value);
   }

   const handleClick = () => {
      dispatch({ type: 'searching', value: searchValue });
   }

   return (
      <Navbar className={s.header} expand="lg">
         <Container>
            <Navbar.Brand href="#home">
               <img src='/img/uuVideoLOGO.png' width={70} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto my-2 my-lg-0">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">About</Nav.Link>
                  <NavDropdown title="Genres" id="basic-nav-dropdown">
                     <NavDropdown.Item href="#action/3.1">Programming</NavDropdown.Item>
                     <NavDropdown.Item href="#action/3.2">Language</NavDropdown.Item>
                     <NavDropdown.Item href="#action/3.3">Guides</NavDropdown.Item>
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
                     onClick={handleClick}
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

