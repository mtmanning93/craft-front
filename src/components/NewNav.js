import React from "react";
import { Col, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ClickOutsideToggle from "../hooks/ClickOutsideToggle";
import icon from "../assets/icon_nobg.png";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import MainButton from "./buttons/MainButton";
import styles from "../styles/NewNav.module.css"

const NewNav = () => {
  const currentUser = useCurrentUser();

  const { expanded, setExpanded, ref } = ClickOutsideToggle();
  const createBtn = (
    <NavLink to="/posts/create">
      <MainButton
        type="button"
        text={
          <>
            <i className="fa-solid fa-plus"></i>
          </>
        }
      ></MainButton>
    </NavLink>
  );

  return (
    <Navbar expanded={expanded} expand="md">
      <Container fluid>

        <Col xs={2} md={4}>
          <NavLink to="/">
            <Navbar.Brand className="mx-auto">
              <img src={icon} alt="logo" height={50} />
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

        <Navbar.Toggle
          ref={ref}
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          className={`${styles.Toggle} border-0 p-0`}
        >
          <Avatar src={currentUser?.profile_image} height={40} />
        </Navbar.Toggle>

        <Navbar.Collapse className="justify-content-md-end" id="basic-navbar-nav">
          {/* Small Screens */}
          <Nav className="ml-auto d-block d-md-none text-right">
            <p className="mb-1">Welcome back {currentUser?.username}</p>
            <NavLink to="/">Profile</NavLink>
            <NavDropdown.Divider />
            <NavLink to="/">Logout</NavLink>
          </Nav>

          {/* Large Screens */}
          <Col md={4} className="d-none d-md-flex justify-content-end p-0">
            <Nav className="ml-auto d-none d-md-block">
              <NavDropdown
                title={<Avatar src={currentUser?.profile_image} height={40} />}
                alignRight
                id="large-nav-dropdown"
                className={styles.Dropdown}
              >
                <NavLink to="/">Profile</NavLink>
                <NavDropdown.Divider />
                <NavLink to="/">Logout</NavLink>
              </NavDropdown>
            </Nav>
          </Col>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NewNav;
