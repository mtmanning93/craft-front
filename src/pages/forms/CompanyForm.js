import React, { useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import mainStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import MainButton from "../../components/buttons/MainButton";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CompanyForm = () => {
	const [companyData, setCompanyData] = useState({
		name: "",
		location: "",
		type: "",
	});
	const [errors, setErrors] = useState({});

	const { name, location, type } = companyData;

	const history = useHistory();

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
			await axiosReq.post("/companies/", formData);
            history.goBack();
		} catch (err) {
			console.log(err);
			setErrors(err.response?.data || {});
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row
				id="inputs"
				className={`${mainStyles.Content} border m-2 p-2 p-md-0 flex-column flex-md-row`}
			>
				<Col className="m-md-2 p-0">
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
						<Form.Label className="d-none">Location</Form.Label>
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
					text="Add Company"
					className={btnStyles.Wide}
				/>
			</Row>
		</Form>
	);
};

export default CompanyForm;
