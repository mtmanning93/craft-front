import React from "react";
import BackButton from "../components/buttons/BackButton";
import { Card } from "react-bootstrap";
import errorCone from "../assets/error_cone.jpg";
import mainStyles from "../App.module.css";

const ErrorPage = () => {
	return (
		<Card className={`${mainStyles.Content} text-center m-3 p-2`}>
			<Card.Img variant="top" src={errorCone} alt="Error page cone" />
			<Card.Body>
				<Card.Title className="border-bottom border-dark pb-2" as="h1">Resource Not Found</Card.Title>
				<Card.Text>
					Click the button below to go back to previous page.
				</Card.Text>
				<BackButton />
			</Card.Body>
		</Card>
	);
};

export default ErrorPage;
