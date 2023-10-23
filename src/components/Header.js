import React from "react";
import { Nav } from "react-bootstrap";
import styles from "../styles/Header.module.css";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <Nav justify variant="tabs">
      <Nav.Item>
        <LinkContainer exact to="/">
          <Nav.Link eventKey="home">
            <i class="fa-solid fa-magnifying-glass"></i>Discover
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/signup">
          <Nav.Link eventKey="feed">
            <i class="fa-solid fa-user-group"></i>Feed
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/liked">
          <Nav.Link eventKey="liked">
            <i class="fa-solid fa-heart"></i>Liked
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/top">
          <Nav.Link eventKey="top">
            <i class="fa-solid fa-ranking-star"></i>Top
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
};

export default Header;
