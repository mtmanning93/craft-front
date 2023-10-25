import React from "react";
import styles from "../styles/NavBar.module.css";
import { Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../assets/main_logo.png";
import icon from "../assets/icon_nobg.png";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import ClickOutsideToggle from "../hooks/ClickOutsideToggle";
import MainButton from "./buttons/MainButton";
import btnStyles from "../styles/Buttons.module.css";

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
      <MainButton
        type="button"
        text={
          <>
            <i className="fa-solid fa-plus"></i>
          </>
        }
        className={btnStyles.PostBtn}
      ></MainButton>
    </NavLink>
  );

  const loggedInToggler = (
    <Navbar.Toggle
      ref={ref}
      className={`ml-auto ${styles.ProfileToggler}`}
      aria-controls="basic-navbar-nav"
      onClick={() => setExpanded(!expanded)}
    >
      <Avatar src={currentUser?.profile_image} height={40} />
    </Navbar.Toggle>
  );

  const loggedOutToggler = (
    <Navbar.Toggle
      ref={ref}
      className={`${styles.Toggler}`}
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
        <MainButton
          type="button"
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
        title={<Avatar src={currentUser?.profile_image} height={50} />}
        className={`d-none d-md-block ${styles.UserDropdown}`}
        alignRight
      >
        <p className={styles.Link}>Welcome back {currentUser?.username}</p>
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
      <p className={`${styles.Link} d-block d-md-none`}>
        Welcome back {currentUser?.username}
      </p>
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
          <img src={logo} alt="logo" className={styles.Logo} />
          <img src={icon} alt="logo" className={styles.Icon} />
        </Navbar.Brand>
      </NavLink>
      <Col className={styles.NavCtrls}>
        {currentUser && createPostBtn}
        {currentUser ? loggedInToggler : loggedOutToggler}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-right">
            {currentUser ? loggedInLinks : loggedOutLinks}
          </Nav>
        </Navbar.Collapse>
      </Col>
    </Navbar>
  );
};

export default NavBar;
