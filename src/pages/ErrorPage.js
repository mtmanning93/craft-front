import React from "react";
import BackButton from "../components/buttons/BackButton";
import { Container } from "react-bootstrap";

const ErrorPage = () => {
	return (
		<Container fluid className="d-flex flex-column text-center mt-3">
			<h1>Resource Not Found</h1>
			<p>Click the button below to go back to previous page.</p>
			<div>
			    <BackButton />
			</div>
		</Container>
	);
};

export default ErrorPage;
