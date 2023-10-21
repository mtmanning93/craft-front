import React from "react";
import styles from "../styles/NavBar.module.css";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import logo from "../assets/main_logo.png";

const NavBar = () => {
  return (
    <Navbar expand="md" className={styles.NavBar}>
      <Container fluid>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="60" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <Nav.Link className={styles.Link}>Home</Nav.Link>
            <Nav.Link className={styles.Link}>Login</Nav.Link>
            {/* Button to be seperate component */}
            <Button className={`${styles.Link} ${styles.buttonStyle}`} variant="warning">
              <i className="fas fa-user-plus"></i> Sign up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
