import React, { useRef, useState } from "react";
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
import { useErrorContext } from "../../contexts/ErrorContext.js";

/**
 * Form for new user registration.
 */
const SignUpForm = () => {
    const { showSuccessAlert } = useErrorContext();
	useRedirectUser("loggedIn");

	const [errors, setErrors] = useState({});

	const usernameRef = useRef();
	const password1Ref = useRef();
	const password2Ref = useRef();

	const history = useHistory();

    // Handles the signup form submition, sending form data to registration endpoint.
    // Pushes new user to login form.
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const formData = {
				username: usernameRef.current.value,
				password1: password1Ref.current.value,
				password2: password2Ref.current.value,
			};
			await axios.post(
				"/dj-rest-auth/registration/",
				formData
			);
            showSuccessAlert(
				"Success",
				"You have successfully registered an account. Please login to access new features.",
				"success"
			);
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
				<Form.Group>
					<Form.Label htmlFor="username-signup" className="sr-only">
						Username
					</Form.Label>
					<Form.Control
						id="username-signup"
						className={styles.Input}
						type="text"
						placeholder="Enter Username"
						name="username"
						ref={usernameRef}
					/>
				</Form.Group>
				{errors.username?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}

				<Form.Group>
					<Form.Label htmlFor="password1" className="sr-only">
						Password
					</Form.Label>
					<Form.Control
						id="password1"
						className={styles.Input}
						type="password"
						placeholder="Password"
						name="password1"
						ref={password1Ref}
					/>
				</Form.Group>
				{errors.password1?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}

				<Form.Group>
					<Form.Label htmlFor="password2" className="sr-only">
						Confirm password
					</Form.Label>
					<Form.Control
						id="password2"
						className={styles.Input}
						type="password"
						placeholder="Confirm password"
						name="password2"
						ref={password2Ref}
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
