import React from "react";
import { Col, Row, Nav } from "react-bootstrap";
import styles from "../styles/Header.module.css";
import { Link, NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const Header = () => {
  const currentUser = useCurrentUser();

  const loggedOutHeader = (
    <Row className={`flex-column flex-sm-row p-3 bg-none ${styles.Header}`}>
      <Col className={`${styles.HeaderBorder} text-start text-lg-center col`}>
        <h2>Welcome to Craft Social!</h2>
      </Col>
      <Col className={styles.HeaderBorder}>
        <p>
          A network where craft is appreciated, showcased and celebrated.
          <br />
          <Link to="/signup"><strong>Sign up</strong></Link> now to join the community!
        </p>
      </Col>
      <Col className="d-none d-sm-block pl-0" sm={4}>
        <ul className="m-0">
          <li>Gain profile approvals</li>
          <li>Share your hardwork</li>
          <li>Join the conversation</li>
        </ul>
      </Col>
    </Row>
  );

  const loggedInHeader = (
    <Nav justify className={`pt-3 bg-none ${styles.Header}`}>
      <NavLink
        exact
        to="/"
        className={styles.HeaderTab}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
        <span className={styles.TabName}>Discover</span>
      </NavLink>
      <NavLink
        to="/feed"
        className={styles.HeaderTab}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-user-group"></i>
        <span className={styles.TabName}>Feed</span>
      </NavLink>
      <NavLink
        to="/liked"
        className={styles.HeaderTab}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-heart"></i>
        <span className={styles.TabName}>Liked</span>
      </NavLink>
      <NavLink
        to="/top"
        className={styles.HeaderTab}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-ranking-star"></i>
        <span className={styles.TabName}>Top</span>
      </NavLink>
    </Nav>
  );

  return currentUser ? loggedInHeader : loggedOutHeader;
};

export default Header;
