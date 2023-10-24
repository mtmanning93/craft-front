import React from "react";
import styles from "../styles/NavBar.module.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../assets/main_logo.png";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import ClickOutsideToggle from "../hooks/ClickOutsideToggle";
import ActionButton from "./ActionButton";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = ClickOutsideToggle();

  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const createPostBtn = (
    <NavLink to="/posts/create" className={styles.Link}>
      <ActionButton
        variant="warning"
        size="md"
        type="button"
        text={
          <>
            <span className="d-none d-md-block">Build Post</span><i className="fa-solid fa-plus"></i>
          </>
        }
        className={styles.CreatePostBtn}
      ></ActionButton>
    </NavLink>
  );

  const loggedInToggler = (
    <Navbar.Toggle
      ref={ref}
      className={`ml-auto ${styles.ProfileToggler}`}
      aria-controls="basic-navbar-nav"
      onClick={() => setExpanded(!expanded)}
    >
      <Avatar
        src={currentUser?.profile_image}
        text={currentUser?.username}
        height={40}
      />
    </Navbar.Toggle>
  );

  const loggedOutToggler = (
    <Navbar.Toggle
      ref={ref}
      className={`ml-auto ${styles.Toggler}`}
      aria-controls="basic-navbar-nav"
      onClick={() => setExpanded(!expanded)}
    />
  );

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
        <ActionButton
          variant="warning"
          size="md"
          type="button" // Adjust the type if needed
          text={
            <>
              <i className="fas fa-user-plus"></i> Sign Up
            </>
          }
          className={`${styles.Link} ${styles.NavBtn} mr-0`}
        />
      </NavLink>
    </>
  );

  const loggedInLinks = (
    <>
      <NavDropdown
        title={
          <Avatar
            src={currentUser?.profile_image}
            text={currentUser?.username}
            height={50}
          />
        }
        className={`d-none d-md-block ${styles.UserDropdown}`}
      >
        <NavLink
          to={`/profiles/${currentUser?.profile_id}`}
          onClick={() => {}}
          className={styles.Link}
          activeClassName={styles.Active}
        >
          Profile
        </NavLink>
        <NavDropdown.Divider />
        <NavLink to="/" onClick={handleLogOut} className={styles.Link}>
          Logout
        </NavLink>
      </NavDropdown>

      {/* small screeens */}
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={() => {}}
        className={`d-block d-md-none ${styles.Link}`}
        activeClassName={styles.Active}
      >
        Profile
      </NavLink>
      <NavLink
        to="/"
        onClick={handleLogOut}
        className={`d-block d-md-none ${styles.Link}`}
      >
        Logout
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} expand="md" className={styles.NavBar}>
      <NavLink to="/">
        <Navbar.Brand className="mx-auto">
          <img src={logo} alt="logo" height="60" className={styles.Logo} />
        </Navbar.Brand>
      </NavLink>
      {currentUser && createPostBtn}
      {currentUser ? loggedInToggler : loggedOutToggler}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto text-right">
          {currentUser ? loggedInLinks : loggedOutLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
