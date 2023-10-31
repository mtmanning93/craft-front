import React from "react";
import { Col, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ClickOutsideToggle from "../hooks/ClickOutsideToggle";
import icon from "../assets/icon_nobg.png";
import logo from "../assets/main_logo.png";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import MainButton from "./buttons/MainButton";
import styles from "../styles/NavBar.module.css";
import axios from "axios";
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

  const createBtn = (
    <NavLink to="/posts/create">
      <MainButton
        type="button"
        className={btnStyles.CreateBtn}
        text={
          <>
            <i className="fa-solid fa-plus"></i>
          </>
        }
      ></MainButton>
    </NavLink>
  );

  const loggedOutToggler = (
    <Navbar.Toggle
      ref={ref}
      aria-controls="basic-navbar-nav"
      onClick={() => setExpanded(!expanded)}
      className="border-0 p-0"
    />
  );

  const loggedInToggler = (
    <Navbar.Toggle
      ref={ref}
      aria-controls="basic-navbar-nav"
      onClick={() => setExpanded(!expanded)}
      className="border-0 p-0"
    >
      <Avatar src={currentUser?.profile_image} height={40} />
    </Navbar.Toggle>
  );

  const loggedOutNav = (
    <>
      <Navbar.Collapse
        className="text-right justify-content-end"
        id="basic-navbar-nav"
      >
        <Nav className="align-items-center">
          <NavLink
            exact
            to="/"
            className={styles.Links}
            activeClassName={styles.Active}
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={styles.Links}
            activeClassName={styles.Active}
          >
            Login
          </NavLink>
          <NavLink to="/signup" className={styles.Links}>
            <MainButton
              type="button"
              className={`${styles.NavBtn} mr-0`}
              text={
                <>
                  <i className="fas fa-user-plus"></i> Sign Up
                </>
              }
            />
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </>
  );

  const loggedInNav = (
    <>
      <Navbar.Collapse className="justify-content-md-end" id="basic-navbar-nav">
        {/* Small Screens */}
        <Nav className="ml-auto d-block d-md-none text-right">
          {currentUser && (
            <p className="mb-1">Welcome back {currentUser?.username}</p>
          )}
          <NavLink
            to={`/profiles/${currentUser?.profile_id}`}
            onClick={() => {}}
          >
            Profile
          </NavLink>
          <NavDropdown.Divider />
          <NavLink to="/" onClick={handleLogOut}>
            Logout
          </NavLink>
        </Nav>
        {/* Large Screens */}
        <Col md={4} className="d-none d-md-flex justify-content-end p-0">
          <Nav className="ml-auto d-none d-md-block">
            <NavDropdown
              title={<Avatar src={currentUser?.profile_image} height={50} textBefore={currentUser?.username}/>}
              alignRight
              id="large-nav-dropdown"
              className={styles.Dropdown}
            >
              <p className="mb-1">Welcome back {currentUser?.username}</p>

              <NavLink
                to={`/profiles/${currentUser?.profile_id}`}
                onClick={() => {}}
              >
                Profile
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to="/" onClick={handleLogOut}>
                Logout
              </NavLink>
            </NavDropdown>
          </Nav>
        </Col>
      </Navbar.Collapse>
    </>
  );

  return (
    <Navbar expanded={expanded} expand="md" className={styles.NavBar}>
      <Container fluid className="p-0">
        <Col className={styles.LogoContainer} xs={2} md={4}>
          <NavLink to="/">
            <Navbar.Brand className="mx-auto">
              <img src={logo} alt="logo" className={styles.Logo} />
              <img src={icon} alt="logo" className={styles.Icon} />
            </Navbar.Brand>
          </NavLink>
        </Col>

        {/* small */}
        <Col className="d-flex d-md-none justify-content-end">
          {currentUser && createBtn}
        </Col>

        {/* large */}
        <Col md={4} className="d-none d-md-flex justify-content-center">
          {currentUser && createBtn}
        </Col>

        {currentUser ? loggedInToggler : loggedOutToggler}

        {currentUser ? loggedInNav : loggedOutNav}
      </Container>
    </Navbar>
  );
};

export default NavBar;
