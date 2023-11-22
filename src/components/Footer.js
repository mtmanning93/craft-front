import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
	useCurrentUser,
	useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import styles from "../styles/Footer.module.css";
import { useErrorContext } from "../contexts/ErrorContext";
import axios from "axios";
import { removeTokenTimestamp } from "../jwt/timestamps";

function Footer() {
	const { showErrorAlert, showSuccessAlert } = useErrorContext();
	const currentUser = useCurrentUser();
	const setCurrentUser = useSetCurrentUser();

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

	return (
		<Container
			fluid
			className={`${styles.Footer} text-center text-sm-left`}
		>
			<Row className="justify-content-between">
				<Col className={styles.Border}>
					<p className="d-sm-none">"Skilled workers appreciation."</p>
					<strong className="d-sm-none">
						Craft Social Ltd
						<i className="fa-regular fa-registered ml-2" />
					</strong>
					<strong>Support:</strong>
					<p>
						<i className="fa-solid fa-envelope mr-2" />
						craft_social@support.com
					</p>
				</Col>
				<Col
					className={`${styles.Border} d-none d-sm-block text-center`}
				>
					<p>"Skilled workers appreciation."</p>
					<strong>
						Craft Social Ltd
						<i className="fa-regular fa-registered ml-2" />
					</strong>
				</Col>
				<Col className="d-none d-sm-block text-right">
					<strong className="m-0">Navigation:</strong>
					{currentUser ? (
						<ul className={styles.FooterNav}>
							<li>
								<Link
									to={`/profiles/${currentUser?.profile_id}`}
									aria-label="profile"
									className="text-light"
								>
									Profile
									<i className="fa-solid fa-user ml-2" />
								</Link>
							</li>
							<li>
								<Link
									to="/"
									aria-label="discover"
									className="text-light"
								>
									Discover
									<i className="fa-solid fa-magnifying-glass ml-2" />
								</Link>
							</li>
							<li>
								<Link
									to="/"
									onClick={handleLogOut}
									aria-label="logout"
									className="text-danger"
								>
									Logout
									<i className="fa-solid fa-arrow-right-from-bracket ml-2" />
								</Link>
							</li>
						</ul>
					) : (
						<ul className={styles.FooterNav}>
							<li>
								<Link to="/" className="text-light">
									Home<i className="fa-solid fa-house ml-2" />
								</Link>
							</li>
							<li>
								<Link to="/login" className="text-light">
									Login<i className="fa-solid fa-arrow-right-to-bracket ml-2" />
								</Link>
							</li>
							<li>
								<Link to="/signup" className="text-warning">
									Signup<i className="fas fa-user-plus ml-2" />
								</Link>
							</li>
						</ul>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default Footer;
