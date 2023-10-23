import React from "react";
import styles from "../styles/NavBar.module.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import logo from "../assets/main_logo.png";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const loggedOutLinks = (
    <>
      <NavLink
        exact
        to="/"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        Home
      </NavLink>
      <NavLink
        to="/login"
        className={styles.Link}
        activeClassName={styles.Active}
      >
        Login
      </NavLink>
      <NavLink to="/signup">
        {/* Button to be seperate component */}
        <Button
          className={`${styles.Link} ${styles.buttonStyle} mr-0`}
          variant="warning"
        >
          <i className="fas fa-user-plus"></i> Sign up
        </Button>
      </NavLink>
    </>
  );
  const loggedInLinks = (
    <>
      <NavLink
        to="/"
        onClick={() => {}}
        className={styles.Link}
      >
        Logout
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={() => {}}
        className={styles.Link}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  return (
    <Navbar expand="md" className={`${styles.NavBar}`}>
      <NavLink to="/">
        <Navbar.Brand className="mx-auto">
          <img src={logo} alt="logo" height="60" />
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle
        className={styles.Toggler}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto text-right">
          {currentUser ? loggedInLinks : loggedOutLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
