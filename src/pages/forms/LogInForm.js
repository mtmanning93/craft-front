import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import icon from "../../assets/icon_nobg.png";
import styles from "../../styles/SignUpForm.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import MainButton from "../../components/buttons/MainButton";
import btnStyles from "../../styles/Buttons.module.css";
import { useRedirectUser } from "../../hooks/useRedirectUser";
import { useErrorContext } from "../../contexts/ErrorContext";
import { setTokenTimestamp } from "../../jwt/timestamps";

const LogInForm = () => {
	useRedirectUser("loggedIn");
    const { showSuccessAlert } = useErrorContext();

	const setCurrentUser = useSetCurrentUser();

	const [errors, setErrors] = useState({});
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

	const { username, password } = loginData;

	const history = useHistory();

	const handleChange = (event) => {
		setLoginData({
			...loginData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.post(
				"/dj-rest-auth/login/",
				loginData
			);
			setCurrentUser(data.user);
            showSuccessAlert(
                "Success",
                "You have successfully logged in.",
                "success"
            )
            setTokenTimestamp(data)
			history.goBack();
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
				Welcome Back!
				<br />
				Busy Week?
			</h1>
			<p>Login here to share your craft.</p>

			<Form className="mb-2" onSubmit={handleSubmit}>
				<h2>Login</h2>
                {errors.non_field_errors?.map((message, idx) => (
					<Alert variant="warning" key={idx} className="mt-3">
						{message}
					</Alert>
				))}
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

				<Form.Group controlId="password">
					<Form.Label className="d-none">Password</Form.Label>
					<Form.Control
						className={styles.Input}
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={handleChange}
					/>
				</Form.Group>
				{errors.password?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<MainButton
					type="submit"
					text="Login!"
					className={btnStyles.Wide}
				/>
			</Form>
			<p>
				Dont have an account? <Link to="/signup">Sign up here.</Link>
			</p>
		</Col>
	);
};

export default LogInForm;
