import React from "react";
import { Row, Card, Col } from "react-bootstrap";
import mainStyles from "../App.module.css";
import Avatar from "./Avatar";
import SettingsDropdown from "./buttons/SettingsDropdown";
import BackButton from "./buttons/BackButton";
import MainButton from "./buttons/MainButton";
import styles from "../styles/Profiles.module.css";

const ProfileCard = (props) => {
	const {
		owner,
		name,
		bio,
		job,
		created_on,
		image,
		is_owner,
		employer,
		posts_count,
		following_count,
		followers_count,
		approval_count,
	} = props;

	const personalInfo = name || job || employer || bio;

	return (
		<Card className={`mt-3 ${mainStyles.Content}`}>
			<Card.Header className="d-flex justify-content-between">
				<div className={styles.Joined}>
					<p>Joined: {created_on}</p>
				</div>
				<div className="mb-2 mb-sm-0 d-flex align-items-center">
					{is_owner && <SettingsDropdown />}
					<BackButton />
				</div>
			</Card.Header>
			<Card.Body>
				<Row className="mb-2 d-flex flex-row">
					<Col className="d-sm-flex text-center text-sm-left">
						<Avatar
							src={image}
							height={160}
							className={styles.Avatar}
						/>

						<div className="m-0 mx-sm-2 w-100 d-flex flex-column justify-content-between">
							<Card.Title as="h1">{owner}'s Profile</Card.Title>
							<div className="d-flex m-auto m-sm-0">
								<MainButton
									onClick={() => {}}
									text="Follow"
									className="mr-2"
								/>
								<MainButton
									variant="success"
									onClick={() => {}}
									text="Approve"
								/>
							</div>
							<div className="mt-2">
								<p className="m-0">
									Approvals: {approval_count}
								</p>
								<p className="m-0">Posts: {posts_count}</p>
								<p className="m-0">
									Following: {following_count}
								</p>
								<p className="m-0">
									Followers: {followers_count}
								</p>
							</div>
						</div>
					</Col>
				</Row>
			</Card.Body>
			{personalInfo && (
				<Card.Footer>
					<Col className={styles.PersonalInfo}>
						<h3>Personal Details</h3>
						{name && (
							<p>
								<i className="fa-solid fa-user" />
								Name: {name}
							</p>
						)}
						{job && (
							<p>
								<i className="fa-solid fa-trowel-bricks" />
								Craft: {job}
							</p>
						)}
						{employer && (
							<p>
								<i className="fa-solid fa-location-dot" />
								Employer: {employer}
							</p>
						)}
						{bio && (
							<Card.Text>
								<i className="fa-solid fa-quote-left" /> {bio}{" "}
								<i className="fa-solid fa-quote-right" />
							</Card.Text>
						)}
					</Col>
				</Card.Footer>
			)}
		</Card>
	);
};

export default ProfileCard;
