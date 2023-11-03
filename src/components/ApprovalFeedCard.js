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

	const owner_card = is_owner && `${styles.OwnerCard}`;

	const number_one = ranking === 1 && `${styles.NumberOne}`;

	return (
		<Card className={`mt-3 mx-2 ${mainStyles.Content} ${owner_card}`}>
			<Link to={`/profiles/${profile.id}`}>
				<Card.Header
					className={`d-flex justify-content-between ${number_one}`}
				>
					<div>
						<p className={styles.Heading}>
							<strong>Approvals ranking: {ranking}</strong>
						</p>
					</div>
					<div>
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
								<Card.Title as="h1" className="border-bottom border-dark pb-2">{profile.owner}</Card.Title>

								<div className="mt-2">
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
