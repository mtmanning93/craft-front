import React from "react";
import mainStyles from "../App.module.css";
import { Row, Col, Card } from "react-bootstrap";
import Avatar from "./Avatar";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/ApprovalFeedCard.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ApprovalFeedCard = ({ profile, ranking }) => {
	const currentUser = useCurrentUser();

	const is_owner = currentUser?.username === profile.owner;

	return (
		<Card className={`mt-3 ${mainStyles.Content}`}>
			<Link to={`/profiles/${profile.id}`}>
				<Card.Header className="d-flex justify-content-between">
					<div>
						<p className={styles.Heading}>
							<strong>Approvals ranking: {ranking}</strong>
						</p>
					</div>
					<div className={styles.HeadIcons}>
						{is_owner && <i className="fa-solid fa-user" />}
						{ranking === 1 && (
							<i className="fas fa-trophy ml-2 text-warning" />
						)}
						{ranking === 2 && (
							<i className="fa-solid fa-medal ml-2 text-dark" />
						)}
						{ranking === 3 && (
							<i
								className={`${styles.Bronze} fa-solid fa-medal ml-2`}
							/>
						)}
					</div>
				</Card.Header>
				<Card.Body>
					<Row className="mb-2 d-flex flex-row">
						<Col className="d-sm-flex text-center text-sm-left">
							<Avatar src={profile.image} height={160} />
							<div className="m-0 mx-sm-2 w-100 d-flex flex-column">
								<Card.Title
									as="h1"
									className="border-bottom border-dark pb-2"
								>
									{profile.owner}
								</Card.Title>

								<div className="mt-2">
									<p>
										<i className="fa-solid fa-calendar-days mr-1" />
										Joined: {profile.created_on}
									</p>
									<p>
										<i className="fa-solid fa-circle-check mr-1" />
										Total approvals:{" "}
										{profile.approval_count}
									</p>
									{profile.name && (
										<p>
											<i className="fa-solid fa-user mr-1" />
											Name: {profile.name}
										</p>
									)}
									{profile.job && (
										<p>
											<i className="fa-solid fa-trowel-bricks mr-1" />
											Craft: {profile.job}
										</p>
									)}
									{profile.employer && (
										<p>
											<i className="fa-solid fa-location-dot mr-1" />
											Employer: {profile.employer}
										</p>
									)}
								</div>
							</div>
						</Col>
					</Row>
				</Card.Body>
			</Link>
		</Card>
	);
};

export default ApprovalFeedCard;
