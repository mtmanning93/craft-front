import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/Footer.module.css";

function Footer() {
	const currentUser = useCurrentUser();

	return (
		<Container fluid className={styles.Footer}>
			<Row className="justify-content-between">
				<Col className="border-right border-dark">
					<p>
						<i className="fa-solid fa-envelope mr-2" />
						craft_social@support.com
					</p>
				</Col>
				<Col className="d-flex align-items-center justify-content-center border-right border-dark">
					Craft Social Ltd &#9415;
				</Col>
				<Col className="text-right">
					{currentUser ? (
						<ul className={styles.FooterNav}>
							<li>
								<Link
									to={`/profiles/${currentUser?.profile_id}`}
								>
									Profile
								</Link>
							</li>
							<li>
								<Link to="/">Discover</Link>
							</li>
							<li>
								<Link to="/feed">Feed</Link>
							</li>
							<li>
								<Link to="/liked">Liked</Link>
							</li>
							<li>
								<Link to="/top">Top</Link>
							</li>
						</ul>
					) : (
						<ul className={styles.FooterNav}>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/login">Login</Link>
							</li>
							<li>
								<Link to="/signup">Signup</Link>
							</li>
						</ul>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default Footer;
