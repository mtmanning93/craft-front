import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import icon from "../assets/icon_nobg.webp";
import logo from "../assets/main_logo.webp";
import {
	useCurrentUser,
	useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import MainButton from "./buttons/MainButton";
import styles from "../styles/NavBar.module.css";
import axios from "axios";
import btnStyles from "../styles/Buttons.module.css";
import { useErrorContext } from "../contexts/ErrorContext";
import { removeTokenTimestamp } from "../jwt/timestamps";

const NavBar = () => {
	const { showErrorAlert, showSuccessAlert } = useErrorContext();
	const currentUser = useCurrentUser();
	const setCurrentUser = useSetCurrentUser();

	const { expanded, setExpanded, ref } = useClickOutsideToggle();

	const handleLogOut = async () => {
		try {
			await axios.post("dj-rest-auth/logout/");
			setCurrentUser(null);
			removeTokenTimestamp();
			showSuccessAlert(
				"Success",
				"You have successfully logged out",
				"success"
			);
		} catch (err) {
			showErrorAlert(`${err.response.status} Error`, `${err}`, "danger");
		}
	};

	const createBtn = (
		<NavLink to="/posts/create" aria-label="Create post link">
			<MainButton
				type="button"
				className={btnStyles.CreateBtn}
				text={
					<>
						<i className="fa-solid fa-plus"></i>
					</>
				}
			/>
		</NavLink>
	);

	const loggedOutToggler = (
		<Navbar.Toggle
			ref={ref}
			aria-label="toggle navigation menu"
			aria-controls="basic-navbar-nav"
			onClick={() => setExpanded(!expanded)}
			className="border-0 p-0"
		/>
	);

	const loggedInToggler = (
		<Navbar.Toggle
			ref={ref}
			aria-label="toggle navigation menu"
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
				<Nav className="align-items-end">
					<NavLink
						exact
						to="/"
						className={styles.Links}
						activeClassName={styles.Active}
						aria-label="home"
					>
						Home <i className="fa-solid fa-house" />
					</NavLink>
					<NavLink
						to="/login"
						className={styles.Links}
						activeClassName={styles.Active}
						aria-label="login"
					>
						Login{" "}
						<i className="fa-solid fa-arrow-right-to-bracket" />
					</NavLink>
					<NavLink to="/signup" className={styles.Links}>
						<MainButton
							type="button"
							className={`${styles.NavBtn} mr-0`}
							aria-label="sign up"
							text={
								<>
									<i className="fas fa-user-plus" /> Sign Up
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
			<Navbar.Collapse
				className="justify-content-md-end"
				id="basic-navbar-nav"
			>
				{/* Small Screens */}
				<Nav className="ml-auto d-block d-md-none text-right">
					{currentUser && (
						<p className="mb-1">
							Welcome back {currentUser?.username}
						</p>
					)}
					<NavLink
						className="d-block"
						to={`/profiles/${currentUser?.profile_id}`}
						aria-label="profile"
					>
						Profile <i className="fa-solid fa-angle-right" />
					</NavLink>
					<NavLink
						className="d-block"
						to={`/profiles/${currentUser?.profile_id}/edit/credentials`}
						aria-label="profile"
					>
						Settings <i className="fa-solid fa-angle-right" />
					</NavLink>
					<NavDropdown.Divider />
					<NavLink
						to="/"
						onClick={handleLogOut}
						aria-label="logout"
						className="text-danger"
					>
						Logout{" "}
						<i className="fa-solid fa-arrow-right-from-bracket" />
					</NavLink>
				</Nav>
				{/* Large Screens */}
				<Col
					md={4}
					className="d-none d-md-flex justify-content-end p-0"
				>
					<Nav className="ml-auto d-none d-md-block">
						<NavDropdown
							title={
								<Avatar
									src={currentUser?.profile_image}
									height={50}
									textBefore={currentUser?.username}
								/>
							}
							alignRight
							id="basic-nav-dropdown"
							className={styles.Dropdown}
						>
							<p className="mb-1">
								Welcome back {currentUser?.username}
							</p>
							<NavDropdown.Item
								as={NavLink}
								to={`/profiles/${currentUser?.profile_id}`}
								aria-label="profile"
								activeClassName={`${styles.Active} bg-none`}
							>
								<span>
									Profile{" "}
									<i className="fa-solid fa-angle-right" />
								</span>
							</NavDropdown.Item>
							<NavDropdown.Item
								as={NavLink}
								to={`/profiles/${currentUser?.profile_id}/edit/credentials`}
								aria-label="settings"
								activeClassName={`${styles.Active} bg-none`}
							>
								<span>
									Settings{" "}
									<i className="fa-solid fa-angle-right" />
								</span>
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item
								as={NavLink}
								to="/"
								onClick={handleLogOut}
								aria-label="logout"
								activeClassName={`${styles.Active} bg-none`}
							>
								<span className="text-danger">
									Logout{" "}
									<i className="fa-solid fa-arrow-right-from-bracket" />
								</span>
							</NavDropdown.Item>
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
							<img
								src={logo}
								alt="logo"
								className={styles.Logo}
                                height="60"
                                width="328"
                                preload="auto"
							/>
							<img
								src={icon}
								alt="logo"
								className={styles.Icon}
                                height="50"
                                width="75"
                                preload="auto"
							/>
						</Navbar.Brand>
					</NavLink>
				</Col>

				{currentUser && (
					<>
						<Col className="d-flex d-md-none justify-content-end">
							{currentUser && createBtn}
						</Col>

						<Col
							md={4}
							className="d-none d-md-flex justify-content-center"
						>
							{currentUser && createBtn}
						</Col>
					</>
				)}

				{currentUser ? loggedInToggler : loggedOutToggler}

				{currentUser ? loggedInNav : loggedOutNav}
			</Container>
		</Navbar>
	);
};

export default NavBar;
