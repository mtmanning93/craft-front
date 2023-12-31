import React, { useEffect, useRef, useState } from "react";
import MainButton from "../../components/buttons/MainButton";
import mainStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import BackButton from "../../components/buttons/BackButton";
import Loader from "../../components/tools/Loader";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/UpdateProfileForm.module.css";
import EmployerSelector from "../../components/tools/EmployerSelector";
import ProfileCompany from "../../components/ProfileCompany";
import { useRedirectUser } from "../../hooks/useRedirectUser";
import { useErrorContext } from "../../contexts/ErrorContext";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * Form for updating user profiles.
 * Only accessible by the owner of the profile.
 * Users can add and update companies,
 * as well as personal information and profile image.
 */
const UpdateProfileForm = () => {
	useRedirectUser("loggedOut");
	const { showErrorAlert } = useErrorContext();
	const setCurrentUser = useSetCurrentUser();

	const [errors, setErrors] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [selectedCompany, setSelectedCompany] = useState("");
	const [profileCompanies, setProfileCompanies] = useState([]);
	const [numberOfCompanies, setNumberOfCompanies] = useState(0);
	const [profileData, setProfileData] = useState({
		name: "",
		image: "",
		job: "",
		bio: "",
		companies: [],
	});

	const { name, image, job, bio } = profileData;

	const imageSelection = useRef(null);
	const history = useHistory();
	const { id } = useParams();

    // Fetches the user profile data to populate the update form.
    // Sets the employer selector to the employer instance chosen by the user.
    // Fetches list of owned companies.
	useEffect(() => {
		const getProfileData = async () => {
			try {
				const response = await axiosReq.get(`/profiles/${id}/`);
				const data = response.data;

				if (data.is_owner) {
					setProfileData({
						name: data.name,
						image: data.image,
						job: data.job,
						bio: data.bio,
						companies: data.companies || [],
						employer: data.employer,
						employer_pk: data.employer_pk,
					});

					data.employer
						? setSelectedCompany({
								value: data.employer_pk,
								label: data.employer,
						  })
						: setSelectedCompany(null);
				} else {
					showErrorAlert(
						"Unauthorized",
						`You are not the owner of this profile, you cannot edit this profile (id:${id}).`,
						"danger"
					);
					history.push("/");
				}
				setLoaded(true);
			} catch (err) {
				console.error(err);
				if (
					err.response.status === 404 ||
					err.response.status === 400
				) {
					showErrorAlert(
						`${err.response.status} error!`,
						"Requested profile could not be found or does not exist.",
						"warning"
					);
					history.push("/page-not-found");
				} else {
					showErrorAlert(
						`${err.response.status} error!`,
						`${err.message}`,
						"warning"
					);
					history.push("/");
				}
			}
		};

		setLoaded(false);
		getProfileData();
	}, [id, history, showErrorAlert]);

    // Handles the form input text field updates to the profile state.
	const handleChange = (event) => {
		setProfileData({
			...profileData,
			[event.target.name]: event.target.value,
		});
	};

    // Fetches the companies owned by the profile owner.
	useEffect(() => {
		const getProfileCompanies = async () => {
			try {
				const { data: profileCompanies } = await axiosReq.get(
					`/companies/?owner__profile=${id}`
				);
				setProfileCompanies(profileCompanies.results);
				setNumberOfCompanies(profileCompanies.count);
			} catch (err) {
				showErrorAlert(
					"Unsuccessful",
					"Unable to fetch requested data",
					"warning"
				);
			}
		};

		getProfileCompanies();
	}, [id, showErrorAlert]);

	const handleSelectedCompanyChange = (value) => {
		setSelectedCompany(value);
	};

	const profileOwnedCompanies = (
		<>
			<Col
				className={`${styles.PersonalInfo} mt-2 p-2 border-top border-dark`}
			>
				<div className="d-flex justify-content-between">
					<h3>Owned companies</h3>
					{numberOfCompanies < 3 ? (
						<Link to="/companies/create/">
							<Button className={styles.AddCompanyBtn}>
								<i className="fa-solid fa-plus" />
								<span className="ml-2 d-none d-sm-inline">
									Add Company
								</span>
							</Button>
						</Link>
					) : (
						<p className="text-center">
							(You have reached the maximum number of companies
							for this profile)
						</p>
					)}
				</div>
                {/* displays a list of company components owned by the user. */}
				{profileCompanies.length ? (
					profileCompanies.map((company) => (
						<ProfileCompany
							key={company.id}
							{...company}
							setProfileData={setProfileData}
							setProfileCompanies={setProfileCompanies}
							selectedCompany={selectedCompany}
							handleSelectedCompanyChange={
								handleSelectedCompanyChange
							}
						/>
					))
				) : (
					<p className="text-center">
						You have not yet added your own company.
					</p>
				)}
			</Col>
		</>
	);

    // Handles the submition of the update profile form, incluing updating the selected employer.
	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();

		formData.append("name", name);
		formData.append("job", job);

		if (selectedCompany) {
			formData.append("employer", selectedCompany.value);
		}
		formData.append("bio", bio);
		formData.append("image", imageSelection?.current?.files[0] || "");

		try {
			const response = await axiosReq.put(`/profiles/${id}/`, formData);

			setCurrentUser((prevUser) => ({
				...prevUser,
				profile_image: response.data.image,
			}));
			history.push(`/profiles/${id}`);
		} catch (err) {
			console.error(err);
			err.response && err.response.data && setErrors(err.response.data);
		}
	};

	return (
		<Col sm={12} md={10} lg={8} className="p-0">
			<Form
				onSubmit={handleSubmit}
				className={`${mainStyles.Content} m-3 pt-2 pb-2`}
			>
				<Row className="m-2 pb-2 border-bottom justify-content-between">
					<Col>
						<h2>Update Profile</h2>
					</Col>
					<Col className="text-right" xs={3}>
						<BackButton />
					</Col>
				</Row>
                {/* shows spinner until component renders */}
				{loaded ? (
					<>
						<Row
							className={`m-2 p-2 flex-column flex-md-row justify-content-center align-items-center`}
						>
							<Col className="d-flex justify-content-center align-items-center pt-2">
								<Form.Group className="m-0 d-flex flex-column align-items-center">
									<Form.Label className="d-none">
										Image
									</Form.Label>
									{image && (
										<>
											<figure>
												<Image
													className={styles.Image}
													src={image}
													alt="Current profile image, click to update"
												/>
											</figure>
											<div className="p-0 mb-2 text-center">
												<Form.Label
													className="btn"
													htmlFor="upload"
												>
													<i className="fa-solid fa-images mr-2" />
													Click to update profile
													image.
												</Form.Label>
											</div>
										</>
									)}

									<Form.File
										id="upload"
										accept="image/*"
										onChange={(e) => {
											if (e.target.files.length) {
												setProfileData({
													...profileData,
													image: URL.createObjectURL(
														e.target.files[0]
													),
												});
											}
										}}
										ref={imageSelection}
										hidden
									/>
								</Form.Group>
								{errors.image?.map((message, idx) => (
									<Alert variant="warning" key={idx}>
										{message}
									</Alert>
								))}
							</Col>
							<Col className="p-0 p-sm-2">
								<Form.Group>
									<Form.Label htmlFor="profile-name">
										<i className="fa-solid fa-user" /> Name:
									</Form.Label>
									<Form.Control
										id="profile-name"
										type="text"
										name="name"
										placeholder="Name"
										value={name}
										onChange={handleChange}
									/>
								</Form.Group>
								{errors.name?.map((message, idx) => (
									<Alert variant="warning" key={idx}>
										{message}
									</Alert>
								))}

								<Form.Group>
									<Form.Label htmlFor="profile-craft">
										<i className="fa-solid fa-trowel-bricks" />{" "}
										Craft:
									</Form.Label>
									<Form.Control
										id="profile-craft"
										type="text"
										name="job"
										placeholder="Job"
										value={job}
										onChange={handleChange}
									/>
								</Form.Group>
								{errors.job?.map((message, idx) => (
									<Alert variant="warning" key={idx}>
										{message}
									</Alert>
								))}

								<Form.Group>
									<Form.Label>
										<i className="fa-solid fa-location-dot" />{" "}
										Employer:
									</Form.Label>
									<EmployerSelector
										key={profileCompanies.length}
										value={selectedCompany}
										onChange={setSelectedCompany}
									/>
								</Form.Group>
								{errors.employer?.map((message, idx) => (
									<Alert variant="warning" key={idx}>
										{message}
									</Alert>
								))}

								<Form.Group>
									<Form.Label htmlFor="profile-bio">
										<i className="fa-solid fa-pencil" /> Bio
									</Form.Label>
									<Form.Control
										id="profile-bio"
										as="textarea"
										rows={5}
										name="bio"
										placeholder="Tell us about yourself..."
										value={bio}
										onChange={handleChange}
									/>
								</Form.Group>
								{errors.bio?.map((message, idx) => (
									<Alert variant="warning" key={idx}>
										{message}
									</Alert>
								))}
							</Col>
						</Row>
						<Container className="justify-content-center">
							{profileOwnedCompanies}
						</Container>
						<Row className="m-2">
							<MainButton
								type="Update"
								text="Update Profile!"
								className={btnStyles.Wide}
							/>
						</Row>
						{errors.non_field_errors?.map((message, idx) => (
							<Alert variant="warning" key={idx} className="mt-3">
								{message}
							</Alert>
						))}
					</>
				) : (
					<Loader loader variant="warning" />
				)}
			</Form>
		</Col>
	);
};

export default UpdateProfileForm;
