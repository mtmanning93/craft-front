import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";

const CredentialsForm = () => {
	const user = useCurrentUser();
	const setUser = useSetCurrentUser();

	const history = useHistory();
	const { id } = useParams();

	const [passwordData, setPasswordData] = useState({
		new_password1: "",
		new_password2: "",
	});
	const [username, setUsername] = useState("");

	const { new_password1, new_password2 } = passwordData;

	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		setPasswordData({
			...passwordData,
			[event.target.name]: event.target.value,
		});
        setUsername(event.target.value);
	};

	useEffect(() => {
		if (user?.profile_id?.toString() !== id) {
			history.push("/");
		} else {
			setUsername(user.username);
		}
	}, [user, history, id]);

	const handlePasswordSubmit = async (event) => {
		event.preventDefault();
		try {
			await axiosRes.post("/dj-rest-auth/password/change/", {
				passwordData,
			});
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
			await axiosRes.put("/dj-rest-auth/user/", { username, });
            setUser((prevUser) => ({
                ...prevUser,
                username,
              }));
			history.goBack();
		} catch (err) {
			console.log(err);
			setErrors(err.response?.data);
		}
	};

	return (
		<div>
			<Form onSubmit={handleUsernameSubmit}>
				<Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control
						placeholder="new username"
						type="text"
						value={username}
						onChange={handleChange}
						name="username"
					/>
				</Form.Group>
				{errors.new_username?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Button onClick={() => history.goBack()}>cancel</Button>
				<Button type="submit">save</Button>
			</Form>
			<Form onSubmit={handlePasswordSubmit}>
				<Form.Group>
					<Form.Label>New password</Form.Label>
					<Form.Control
						placeholder="new password"
						type="password"
						value={new_password1}
						onChange={handleChange}
						name="new_password1"
					/>
				</Form.Group>
				{errors.new_password1?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Form.Group>
					<Form.Label>Confirm password</Form.Label>
					<Form.Control
						placeholder="confirm new password"
						type="password"
						value={new_password2}
						onChange={handleChange}
						name="new_password2"
					/>
				</Form.Group>
				{errors.new_password2?.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))}
				<Button onClick={() => history.goBack()}>cancel</Button>
				<Button type="submit">save</Button>
			</Form>
		</div>
	);
};

export default CredentialsForm;
