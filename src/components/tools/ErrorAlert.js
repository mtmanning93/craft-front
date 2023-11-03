import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import styles from "../../styles/Alert.module.css";

const ErrorAlert = () => {
	const [show, setShow] = useState(false);

	const handleButtonClick = () => {
		setShow(true);
	};

	return (
		<div className={styles.Temp}>
			<Button onClick={handleButtonClick}>Show Error</Button>
			{show && (
				<Alert
					className={styles.Container}
					variant="danger"
					onClose={() => setShow(false)}
					dismissible
				>
					<Alert.Heading>Error</Alert.Heading>
					<p>Error message goes here.</p>
				</Alert>
			)}
		</div>
	);
};

export default ErrorAlert;
