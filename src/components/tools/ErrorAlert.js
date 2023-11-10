import React, { useEffect, useState, useRef } from "react";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/Alert.module.css";
import { useErrorContext } from "../../contexts/ErrorContext";

const CustomAlert = () => {
	const { errorInfo, clearErrorAlert } = useErrorContext();
	const [show, setShow] = useState(false);

	const timeoutRef = useRef(null);

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
