import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import styles from "../../styles/Alert.module.css";
import { useErrorContext } from "../../contexts/ErrorContext";

const ErrorAlert = () => {
	const { errorInfo, clearErrorAlert } = useErrorContext();
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (errorInfo) {
			setShow(true);

			setTimeout(() => {
				setShow(false);
				clearErrorAlert();
			}, 5000);
		}
	}, [errorInfo, clearErrorAlert]);

	return (
		<>
			{show && (
				<Alert
					className={styles.Container}
					variant="warning"
					onClose={() => setShow(false)}
					dismissible
				>
					<Alert.Heading>{errorInfo.title}</Alert.Heading>
					<p>Message: {errorInfo.message}</p>
				</Alert>
			)}
		</>
	);
};

export default ErrorAlert;
