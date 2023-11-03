import React from "react";
import mainStyles from "../App.module.css";
import { Row, Col, Card } from "react-bootstrap";
import Avatar from "./Avatar";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/ApprovalFeedCard.module.css";

const ApprovalFeedCard = ({ profile, ranking }) => {
	const currentUser = useCurrentUser();

	const is_owner = currentUser?.username === profile.owner;

	const OwnerCard = is_owner && `${styles.OwnerCard}`;

	return (
		<Card className={`mt-3 ${mainStyles.Content} ${OwnerCard}`}>
			<Card.Header className="d-flex justify-content-between">
				<p>Approvals ranking: {ranking}</p>
				{ranking === 1 && (
					<i className="fas fa-trophy ml-2" />
				)}
			</Card.Header>
			<Card.Body>
				<Row className="mb-2 d-flex flex-row">
					<Col className="d-sm-flex text-center text-sm-left">
						<Avatar src={profile.image} height={160} />
						<div className="m-0 mx-sm-2 w-100 d-flex flex-column justify-content-between">
							<Card.Title as="h1">{profile.owner}</Card.Title>

							<div className="mt-2">
								<p className="m-0">
									Total number of Approvals:{" "}
									{profile.approval_count}
								</p>
								{profile.name && (
									<p>
										<i className="fa-solid fa-user" />
										Name: {profile.name}
									</p>
								)}
								{profile.job && (
									<p>
										<i className="fa-solid fa-trowel-bricks" />
										Craft: {profile.job}
									</p>
								)}
								{profile.employer && (
									<p>
										<i className="fa-solid fa-location-dot" />
										Employer: {profile.employer}
									</p>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
};

export default ApprovalFeedCard;
