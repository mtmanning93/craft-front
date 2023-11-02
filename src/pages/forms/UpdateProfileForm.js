import React, { useEffect, useRef, useState } from "react";
import MainButton from "../../components/buttons/MainButton";
import mainStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	Image,
	Row,
} from "react-bootstrap";
import BackButton from "../../components/buttons/BackButton";
import Loader from "../../components/tools/Loader";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/UpdateProfileForm.module.css";
import EmployerSelector from "../../components/tools/EmployerSelector";
import ProfileCompany from "../../components/ProfileCompany";

const UpdateProfileForm = () => {
	const [profileData, setProfileData] = useState({
		name: "",
		image: "",
		job: "",
		bio: "",
        companies: [],
	});
	const [errors, setErrors] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [selectedCompany, setSelectedCompany] = useState("");
	const [profileCompanies, setProfileCompanies] = useState([]);
	const [numberOfCompanies, setNumberOfCompanies] = useState(0);

	const { name, image, job, bio } = profileData;

	const imageSelection = useRef(null);

	const history = useHistory();

	const { id } = useParams();

	useEffect(() => {
		const getProfileData = async () => {
			try {
				const response = await axiosReq.get(`/profiles/${id}/`);
				const data = response.data;

				setProfileData({
					name: data.name,
					image: data.image,
					job: data.job,
					bio: data.bio,
                    companies: data.companies || [],
				});

				data.employer
					? setSelectedCompany({
							value: data.employer,
							label: data.employer,
					  })
					: setSelectedCompany(null);

				setLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};

		setLoaded(false);
		getProfileData();
	}, [id]);

	const handleChange = (event) => {
		setProfileData({
			...profileData,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {
		const getProfileCompanies = async () => {
			try {
				const { data: profileCompanies } = await axiosReq.get(
					`/companies/?owner__profile=${id}`
				);
				setProfileCompanies(profileCompanies.results);
				setNumberOfCompanies(profileCompanies.count);
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
						<ProfileCompany
							key={company.id}
							{...company}
                            setProfileData={setProfileData}
                            setProfileCompanies={setProfileCompanies}
						/>
					))}
				</Col>
			) : null}
		</>
	);

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
			await axiosReq.put(`/profiles/${id}/`, formData);
			history.push(`/profiles/${id}`);
		} catch (error) {
			console.error(error);
			error.response &&
				error.response.data &&
				setErrors(error.response.data);
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
									<Form.Label>
										<i className="fa-solid fa-user" /> Name:
									</Form.Label>
									<Form.Control
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
									<Form.Label>
										<i className="fa-solid fa-trowel-bricks" />{" "}
										Craft:
									</Form.Label>
									<Form.Control
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
									<Form.Label>
										<i className="fa-solid fa-pencil" /> Bio
									</Form.Label>
									<Form.Control
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
							{numberOfCompanies < 3 ? (
								<Link to="/companies/create/">
									<Button>Add Company</Button>
								</Link>
							) : (
								<p className="text-center">
									(You have reached the maximum number of
									companies for this profile)
								</p>
							)}
						</Container>
						<Row className="m-2">
							<MainButton
								type="Update"
								text="Update Profile!"
								className={btnStyles.Wide}
							/>
						</Row>
					</>
				) : (
					<Loader loader variant="warning" />
				)}
			</Form>
		</Col>
	);
};

export default UpdateProfileForm;
