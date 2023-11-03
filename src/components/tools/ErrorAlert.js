import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import styles from "../../styles/Alert.module.css";
import { useErrorContext } from "../../contexts/ErrorContext";

const ErrorAlert = ({ title, message }) => {
    const { errorInfo, clearErrorAlert } = useErrorContext();
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (errorInfo) {
			setShow(true);

			setTimeout(() => {
				setShow(false);
                clearErrorAlert()
			}, 5000);
		}
	}, [errorInfo, clearErrorAlert]);

	return (
		<div className={styles.Temp}>
			{/* <Button onClick={handleButtonClick}>Show Error</Button> */}
			{show && (
				<Alert
					className={styles.Container}
					variant="danger"
					onClose={() => setShow(false)}
					dismissible
				>
					<Alert.Heading>Error: {errorInfo.title}</Alert.Heading>
					<p>
						Message:
						{errorInfo.message}
					</p>
				</Alert>
			)}
		</div>
	);
};

export default ErrorAlert;
