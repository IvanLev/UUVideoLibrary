import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import s from "./Header.module.css";

function Header() {
  return (
    <Navbar className={s.header} expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img src='/img/uuVideoLOGO.png' width={70} /></Navbar.Brand>
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
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;


