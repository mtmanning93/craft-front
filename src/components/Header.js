import React from "react";
import { Nav } from "react-bootstrap";
import styles from "../styles/Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Nav justify className={styles.Header} activeKey="/home">
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
        to="/signup"
        className={styles.HeaderTab}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-ranking-star"></i>
        <span className={styles.TabName}>Top</span>
      </NavLink>
    </Nav>
  );
};

export default Header;
