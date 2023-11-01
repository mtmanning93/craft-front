import React, { useEffect, useState } from "react";
import {
	Row,
	Card,
	Col,
	Tooltip,
	OverlayTrigger,
	Button,
} from "react-bootstrap";
import mainStyles from "../App.module.css";
import Avatar from "./Avatar";
import SettingsDropdown from "./buttons/SettingsDropdown";
import BackButton from "./buttons/BackButton";
import MainButton from "./buttons/MainButton";
import styles from "../styles/Profiles.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import btnStyles from "../styles/Buttons.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";

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
		approval_id,
		setProfileData,
	} = props;

	const [profileCompanies, setProfileCompanies] = useState([]);

	const currentUser = useCurrentUser();

	const history = useHistory();

	const { id } = useParams();

	const personalInfo = name || job || employer || bio;

	const editProfile = async () => {
		history.push(`/profiles/${id}/edit`);
	};

	const unApproveProfile = async () => {
		try {
			await axiosRes.delete(`/approvals/${approval_id}/`);
			setProfileData((prevProfileData) => ({
				...prevProfileData,
				results: prevProfileData.results.map((profile) => {
					return profile.id === id
						? {
								...profile,
								approval_count: profile.approval_count - 1,
								approval_id: null,
						  }
						: profile;
				}),
			}));
		} catch (error) {
			console.log(error);
		}
	};

	const approveProfile = async () => {
		try {
			const { data } = await axiosRes.post("/approvals/", {
				profile: id,
			});
			setProfileData((prevProfileData) => ({
				...prevProfileData,
				results: prevProfileData.results.map((profile) => {
					return profile.id === id
						? {
								...profile,
								approval_count: profile.approval_count + 1,
								approval_id: data.id,
						  }
						: profile;
				}),
			}));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getProfileCompanies = async () => {
			try {
				const { data: profileCompanies } = await axiosReq.get(
					`/companies/?owner__profile=${id}`
				);
				setProfileCompanies(profileCompanies.results);
			} catch (err) {
				console.log(err);
			}
		};

		getProfileCompanies();
	}, [id]);

	const profileOwnedCompanies = (
		<>
			{profileCompanies.length ? (
				<Col
					className={`${styles.PersonalInfo} mt-2 p-2 border-top border-dark`}
				>
					<h3>Owned companies</h3>
					{profileCompanies.map((company) => (
						<p key={company.id}>
							<i className="fa-solid fa-house mr-2" />{company.name} ({company.type})
							<i className="fa-solid fa-location-dot mx-2" />
							{company.location}
						</p>
					))}
				</Col>
			) : null}
		</>
	);

	return (
		<Card className={`mt-3 ${mainStyles.Content}`}>
			<Card.Header className="d-flex justify-content-between">
				<div className={styles.Joined}>
					<p>Joined: {created_on}</p>
				</div>
				<div className="mb-2 mb-sm-0 d-flex align-items-center">
					{is_owner && (
						<SettingsDropdown
							editObject={editProfile}
							onDelete={() => {}}
						/>
					)}
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
							{currentUser && (
								<div className="d-flex m-auto m-sm-0">
									{!is_owner && (
										<MainButton
											onClick={() => {}}
											text="Follow"
											className="mr-2"
										/>
									)}

									{!is_owner &&
										(approval_id ? (
											<Button
												className={btnStyles.Approved}
												onClick={unApproveProfile}
											>
												Approved{" "}
												<i className="fa-solid fa-circle-check" />
											</Button>
										) : currentUser ? (
											<OverlayTrigger
												placement="bottom"
												overlay={
													<Tooltip>
														Approve this profile, to
														approve their work, and
														make them more visible.
													</Tooltip>
												}
											>
												<Button
													className={
														btnStyles.Approve
													}
													onClick={approveProfile}
												>
													Approve
												</Button>
											</OverlayTrigger>
										) : (
											<OverlayTrigger
												placement="bottom"
												overlay={
													<Tooltip>
														You must login or signup
														to approve profiles.
													</Tooltip>
												}
											>
												<Button
													className={
														btnStyles.ApproveUnregistered
													}
												>
													Approve
												</Button>
											</OverlayTrigger>
										))}
								</div>
							)}

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
					{profileOwnedCompanies}
				</Card.Footer>
			)}
		</Card>
	);
};

export default ProfileCard;
