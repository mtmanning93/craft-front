import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import styles from "../../styles/Alert.module.css";

const ErrorAlert = () => {
	const [show, setShow] = useState(false);

	const handleButtonClick = () => {
		setShow(true);

		// Set a timeout to hide the alert after 3 seconds
		setTimeout(() => {
			setShow(false);
		}, 3000);
	};

	// Use the useEffect hook to clear the timeout when the component unmounts
	useEffect(() => {
		return () => {
			clearTimeout();
		};
	}, []);

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
