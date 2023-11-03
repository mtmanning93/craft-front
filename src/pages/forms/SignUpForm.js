import React, { useState } from "react";
import { Col, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import icon from "../../assets/icon_nobg.png";
import axios from "axios";
import styles from "../../styles/SignUpForm.module.css";
import MainButton from "../../components/buttons/MainButton.js";
import btnStyles from "../../styles/Buttons.module.css";
import { useRedirectUser } from "../../hooks/useRedirectUser";

const SignUpForm = () => {
	useRedirectUser("loggedIn");
	const [signUpData, setSignUpData] = useState({
		username: "",
		password1: "",
		password2: "",
	});

	const { username, password1, password2 } = signUpData;

	const [errors, setErrors] = useState({});

	const history = useHistory();

	const handleChange = (event) => {
		setSignUpData({
			...signUpData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post("/dj-rest-auth/registration/", signUpData);
			history.push("/login");
		} catch (err) {
			setErrors(err.response?.data);
		}
	};

	return (
		<Col
			className={`mx-auto text-center ${styles.FormWrapper}`}
			sm={6}
			lg={5}
		>
			<img src={icon} alt="site icon" />
			<h1 className={styles.Heading}>
				Love your craft?
				<br />
				Share your craft!
			</h1>
			<p>Sign up here to join the craft social network.</p>

			<Form onSubmit={handleSubmit} className="mb-2">
				<h2>Enter Details</h2>
				<Form.Group controlId="username">
					<Form.Label className="d-none">Username</Form.Label>
					<Form.Control
						className={styles.Input}
						type="text"
						placeholder="Enter Username"
						name="username"
						value={username}
						onChange={handleChange}
					/>
				</Form.Group>
				{errors.username?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}

				<Form.Group controlId="password1">
					<Form.Label className="d-none">Password</Form.Label>
					<Form.Control
						className={styles.Input}
						type="password"
						placeholder="Password"
						name="password1"
						value={password1}
						onChange={handleChange}
					/>
				</Form.Group>
				{errors.password1?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}

				<Form.Group controlId="password2">
					<Form.Label className="d-none">Confirm password</Form.Label>
					<Form.Control
						className={styles.Input}
						type="password"
						placeholder="Confirm password"
						name="password2"
						value={password2}
						onChange={handleChange}
					/>
				</Form.Group>
				{errors.password2?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}

				<MainButton
					type="submit"
					text="Sign Up!"
					className={btnStyles.Wide}
				/>
				{errors.non_field_errors?.map((message, idx) => (
					<Alert variant="warning" key={idx} className="mt-3">
						{message}
					</Alert>
				))}
			</Form>
			<p>
				Already have an account? <Link to="/login">Login here.</Link>
			</p>
		</Col>
	);
};

export default SignUpForm;
