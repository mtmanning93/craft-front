import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import mainStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import MainButton from "../../components/buttons/MainButton";
import { axiosReq } from "../../api/axiosDefaults";
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import BackButton from "../../components/buttons/BackButton";
import { useRedirectUser } from "../../hooks/useRedirectUser";
import { useErrorContext } from "../../contexts/ErrorContext";
import Loader from "../../components/tools/Loader";

const EditCompanyForm = () => {
	useRedirectUser("loggedOut");

	const { showErrorAlert } = useErrorContext();
	const currentUser = useCurrentUser();

    const [errors, setErrors] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [companyData, setCompanyData] = useState({
		name: "",
		location: "",
		type: "",
	});

	const { name, location, type } = companyData;

	const history = useHistory();
	const { id } = useParams();

	useEffect(() => {
		const getCompanyData = async () => {
			try {
				const { data } = await axiosReq.get(`/companies/${id}/`);

				if (data.is_owner) {
					setCompanyData(data);
				} else {
					showErrorAlert(
						"Unauthorized",
						`You are not the owner of this company, you cannot edit '${data.name}' (${id}).`,
						"warning"
					);
					history.push("/");
				}
				setLoaded(true);
			} catch (err) {
				console.log(err.response.status);

				if (err.response.status === 404) {
					showErrorAlert(
						`${err.response.status} error!`,
						"Requested company could not be found or does not exist.",
						"warning"
					);
                    history.push("/page-not-found")
				} else {
					showErrorAlert(
						`${err.response.status} error!`,
						`${err.message}`,
						"warning"
					);
                    history.push("/")
				}
			}
		};

		setLoaded(false);
		getCompanyData();
	}, [history, id, showErrorAlert]);

	const handleChange = (event) => {
		setCompanyData({
			...companyData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();

		formData.append("name", name);
		formData.append("type", type);
		formData.append("location", location);

		try {
			await axiosReq.put(`/companies/${id}/`, formData);
			history.goBack();
		} catch (err) {
			console.log(err.response.data);
			setErrors(err.response?.data);
		}
	};

	return (
		<Col
			xs={11}
			sm={10}
			md={8}
			lg={6}
			className={`${mainStyles.Content} p-0 mt-3`}
		>
			{loaded ? (
				<Form onSubmit={handleSubmit}>
					<Row className="m-2 pb-2 border-bottom">
						<Col
							xs={{ span: 6, order: 1 }}
							md={{ span: 2, order: 1 }}
						>
							<Avatar
								src={currentUser?.profile_image}
								height={40}
								text={currentUser?.username}
							/>
						</Col>
						<Col
							className="text-center pt-2 pt-md-0"
							xs={{ span: 12, order: 3 }}
							md={{ span: 8, order: 2 }}
						>
							<h1 className="mt-2">
								Add a company to your profile
							</h1>
						</Col>
						<Col
							className="text-right"
							xs={{ span: 6, order: 2 }}
							md={{ span: 2, order: 3 }}
						>
							<BackButton />
						</Col>
					</Row>
					<Row
						id="inputs"
						className={`${mainStyles.Content} border m-2 p-2 p-md-0 flex-column`}
					>
						<p className="text-center m-2">
							<strong>Note: </strong>You will automatically become
							the owner of a company you create
						</p>
						<Col className="p-2">
							{Array.isArray(errors) &&
								errors.map((message, idx) => (
									<Alert
										variant="warning"
										key={idx}
										className="mt-3"
									>
										{message}
									</Alert>
								))}
							<Form.Group>
								<Form.Label className="d-none">Name</Form.Label>
								<Form.Control
									type="text"
									name="name"
									placeholder="Company name..."
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
								<Form.Label className="d-none">Type</Form.Label>
								<Form.Control
									type="text"
									name="type"
									placeholder="Trade or Industry?"
									value={type}
									onChange={handleChange}
								/>
							</Form.Group>
							{errors.type?.map((message, idx) => (
								<Alert variant="warning" key={idx}>
									{message}
								</Alert>
							))}
							<Form.Group>
								<Form.Label className="d-none">
									Location
								</Form.Label>
								<Form.Control
									type="text"
									name="location"
									placeholder="Location..."
									value={location}
									onChange={handleChange}
								/>
							</Form.Group>
							{errors.location?.map((message, idx) => (
								<Alert variant="warning" key={idx}>
									{message}
								</Alert>
							))}
						</Col>
					</Row>
					<Row className="m-2">
						<MainButton
							type="submit"
							text="Update Company"
							className={btnStyles.Wide}
						/>
					</Row>
				</Form>
			) : (
				<Loader loader variant="warning" />
			)}
		</Col>
	);
};

export default EditCompanyForm;
