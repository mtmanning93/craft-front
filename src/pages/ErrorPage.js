import React from "react";
import MainButton from "../components/buttons/MainButton";
import Card from "react-bootstrap/Card";
import errorCone from "../assets/error_cone.jpg";
import mainStyles from "../App.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ErrorPage = () => {
    const history = useHistory();

    const goHome = () => {
        history.push("/")
    }
	return (
		<Card className={`${mainStyles.Content} text-center m-3 p-2`}>
			<Card.Img variant="top" src={errorCone} alt="Error page cone" />
			<Card.Body className="d-flex flex-column justify-content-center">
				<Card.Title className="border-bottom border-dark pb-2" as="h1">Resource Not Found</Card.Title>
				<Card.Text>
					Click the button below to go home.
				</Card.Text>
				<MainButton type="button" onClick={goHome} text="Go Home" />
			</Card.Body>
		</Card>
	);
};

export default ErrorPage;
