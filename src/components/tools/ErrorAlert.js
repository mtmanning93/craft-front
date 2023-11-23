import React, { useEffect, useState, useRef } from "react";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/Alert.module.css";
import { useErrorContext } from "../../contexts/ErrorContext";

/**
 * A custom alert component for displaying error messages.
 * @component
 */
const CustomAlert = () => {
	const { errorInfo, clearErrorAlert } = useErrorContext();
	const [show, setShow] = useState(false);

	const timeoutRef = useRef(null);

    // shows error alert if error passed to errorInfo context
	useEffect(() => {
		if (errorInfo) {
			setShow(true);
			timeoutRef.current = setTimeout(() => {
				setShow(false);
				clearErrorAlert();
			}, 5000);
		}
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [errorInfo, clearErrorAlert]);

	return (
		<>
			{show && (
				<Alert
					className={styles.Container}
					variant={errorInfo.variant}
					onClose={() => setShow(false)}
					dismissible
				>
					<Alert.Heading>{errorInfo.title}</Alert.Heading>
					<p>{errorInfo.message}</p>
				</Alert>
			)}
		</>
	);
};

export default CustomAlert;
