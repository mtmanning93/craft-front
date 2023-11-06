import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
	useCurrentUser,
	useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import BackButton from "../../components/buttons/BackButton";
import mainStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import formStyles from "../../styles/SignUpForm.module.css";
import MainButton from "../../components/buttons/MainButton";
import { useRedirectUser } from "../../hooks/useRedirectUser";

const CredentialsForm = () => {
	useRedirectUser("loggedOut");

	const currentUser = useCurrentUser();
	const setCurrentUser = useSetCurrentUser();

	const [passwordData, setPasswordData] = useState({
		new_password1: "",
		new_password2: "",
	});
	const [username, setUsername] = useState("");
	const [errors, setErrors] = useState({});

	const history = useHistory();
	const { id } = useParams();

	const { new_password1, new_password2 } = passwordData;

	useEffect(() => {
		currentUser?.profile_id?.toString() !== id
			? history.push("/")
			: setUsername(currentUser.username);
	}, [currentUser, history, id]);

	const handleChangeUsername = (event) => {
		setUsername(event.target.value);
	};

	const handleChangePassword = (event) => {
		setPasswordData({
			...passwordData,
			[event.target.name]: event.target.value,
		});
	};

	const handlePasswordSubmit = async (event) => {
		event.preventDefault();
		try {
			await axiosRes.post("/dj-rest-auth/password/change/", passwordData);
			setPasswordData((prevUser) => ({
				...prevUser,
				passwordData,
			}));
			history.goBack();
		} catch (err) {
			console.log(err);
			setErrors(err.response?.data);
		}
	};

	const handleUsernameSubmit = async (event) => {
		event.preventDefault();
		try {
			await axiosRes.put("/dj-rest-auth/user/", { username });
			setCurrentUser((prevUser) => ({
				...prevUser,
				username,
			}));
			history.goBack();
		} catch (err) {
			console.log(err);
			setErrors(err.response?.data);
		}
	};

    // const deleteProfile = async () => {
	// 	try {
	// 		await axiosRes.delete(`/profiles/${id}/`);
    //         await axiosRes.post("dj-rest-auth/logout/");
    //         setCurrentUser(null)
	// 		history.push("/");
	// 	} catch (err) {
	// 		console.log(err);
	// 		console.log(err.response?.data);
	// 	}
	// };


	return (
		<Col
			xs={11}
			sm={8}
			md={6}
			lg={4}
			className={`${mainStyles.Content} p-0 mt-3`}
		>
			<Row className="m-2 pb-2 border-bottom">
				<Col xs={{ span: 6, order: 1 }} md={{ span: 3, order: 1 }}>
					<Avatar
						src={currentUser?.profile_image}
						height={40}
					/>
				</Col>
				<Col
					className="text-center pt-2 pt-md-0"
					xs={{ span: 12, order: 3 }}
					md={{ span: 6, order: 2 }}
				>
					<h1 className="mt-2">Update your account</h1>
				</Col>
				<Col
					className="text-right"
					xs={{ span: 6, order: 2 }}
					md={{ span: 3, order: 3 }}
				>
					<BackButton />
				</Col>
			</Row>
			<Form onSubmit={handleUsernameSubmit} className="m-3 border-bottom">
				<h3>Update Username</h3>
				{errors.non_field_errors?.map((message, idx) => (
					<Alert variant="warning" key={idx} className="mt-3">
						{message}
					</Alert>
				))}
				<Form.Group>
					<Form.Label className="d-none">Username</Form.Label>
					<Form.Control
						className={formStyles.Input}
						placeholder="Enter new username"
						type="text"
						value={username}
						onChange={handleChangeUsername}
						name="username"
					/>
				</Form.Group>
				{errors.username?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<MainButton
					type="submit"
					text="update"
					className={`${btnStyles.Wide} mb-3`}
				/>
			</Form>
			<Form onSubmit={handlePasswordSubmit} className="m-3">
				<h3>Update Password</h3>
				{errors.non_field_errors?.map((message, idx) => (
					<Alert variant="warning" key={idx} className="mt-3">
						{message}
					</Alert>
				))}
				<Form.Group>
					<Form.Label className="d-none">New Password</Form.Label>
					<Form.Control
						className={formStyles.Input}
						placeholder="Enter new password"
						type="password"
						value={new_password1}
						onChange={handleChangePassword}
						name="new_password1"
					/>
				</Form.Group>
				{errors.new_password1?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Form.Group>
					<Form.Label className="d-none">Confirm Password</Form.Label>
					<Form.Control
						className={formStyles.Input}
						placeholder="Confirm new password"
						type="password"
						value={new_password2}
						onChange={handleChangePassword}
						name="new_password2"
					/>
				</Form.Group>
				{errors.new_password2?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<MainButton
					type="submit"
					text="update"
					className={btnStyles.Wide}
				/>
				<div></div>
				<p
					className={`${mainStyles.Pointer} text-center mt-2`}
					onClick={() => history.goBack()}
				>
					<i className="fa-solid fa-xmark" /> Cancel
				</p>
			</Form>
            {/* <Button className="btn-danger" onClick={deleteProfile}>Delete Profile</Button> */}
		</Col>
	);
};

export default CredentialsForm;