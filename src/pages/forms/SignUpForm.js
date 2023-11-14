import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link, useHistory } from "react-router-dom";
import icon from "../../assets/icon_nobg.png";
import axios from "axios";
import styles from "../../styles/SignUpForm.module.css";
import MainButton from "../../components/buttons/MainButton.js";
import btnStyles from "../../styles/Buttons.module.css";
import { useRedirectUser } from "../../hooks/useRedirectUser";

const SignUpForm = () => {
	useRedirectUser("loggedIn");

	const [errors, setErrors] = useState({});
	const [signUpData, setSignUpData] = useState({
		username: "",
		password1: "",
		password2: "",
	});

	const { username, password1, password2 } = signUpData;

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
		<Col className={`mx-2 text-center ${styles.FormWrapper}`} sm={6} lg={5}>
			<img src={icon} alt="site icon" />
			<h1 className={styles.Heading}>
				Love your craft?
				<br />
				Share your craft!
			</h1>
			<p>Sign up here to join the craft social network.</p>

			<Form onSubmit={handleSubmit} className="mb-2">
				<h2>Enter Details</h2>
				{errors.non_field_errors?.map((message, idx) => (
					<Alert variant="warning" key={idx} className="mt-3">
						{message}
					</Alert>
				))}
				<Form.Group controlId="username">
					<Form.Label htmlFor="username-signup" className="sr-only">
						Username
					</Form.Label>
					<Form.Control
						id="username-signup"
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
					<Form.Label htmlFor="password1" className="sr-only">
						Password
					</Form.Label>
					<Form.Control
						id="password1"
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
					<Form.Label htmlFor="password2" className="sr-only">
						Confirm password
					</Form.Label>
					<Form.Control
						id="password2"
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
			</Form>
			<p>
				Already have an account? <Link to="/login">Login here.</Link>
			</p>
		</Col>
	);
};

export default SignUpForm;
