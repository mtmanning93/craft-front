import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import logo from "../assets/main_logo.png";

const NavBar = () => {
  return (
    <Container fluid>
      <Navbar expand="md" className="">
        <Navbar.Brand>
          <img src={logo} alt="logo" height="60" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Login</Nav.Link>
            {/* Button to be seperate component */}
            <Button variant="warning"><i className="fas fa-user-plus"></i> Sign up</Button> 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
