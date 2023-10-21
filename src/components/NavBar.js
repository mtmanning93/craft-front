import React from "react";
import styles from "../styles/NavBar.module.css";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import logo from "../assets/main_logo.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="md" className={styles.NavBar}>
      <Container fluid>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="60" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <NavLink exact to="/" className={styles.Link} activeClassName={styles.Active}>
              Home
            </NavLink>
            <NavLink to="/login" className={styles.Link} activeClassName={styles.Active}>
              Login
            </NavLink>
            <NavLink to="/signup">
              {/* Button to be seperate component */}
              <Button
                className={`${styles.Link} ${styles.buttonStyle}`}
                variant="warning"
              >
                <i className="fas fa-user-plus"></i> Sign up
              </Button>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
