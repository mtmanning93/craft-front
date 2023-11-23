import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/Header.module.css";
import { Link, NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

/**
 * Site Welcome Message and Feed Navigation Header
 * @component
 */
const Header = () => {
    const currentUser = useCurrentUser();

    // Welcome message header for logged out user.
    const loggedOutHeader = (
        <Row className={`flex-column flex-sm-row m-0 px-1 py-3 bg-none ${styles.Header}`}>
            <Col
                className={`${styles.HeaderBorder} text-start text-lg-center col`}
            >
                <h2>Welcome to Craft Social!</h2>
            </Col>
            <Col className={styles.HeaderBorder}>
                <p>
                    A network where craft is appreciated, showcased and
                    celebrated.
                    <br />
                    <Link to="/signup">
                        <strong>Sign up</strong>
                    </Link>{" "}
                    now to join the community!
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
    
    // Feed navigation links, header for a logged in user.
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
                <i className="fa-solid fa-thumbs-up"></i>
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
