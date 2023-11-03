import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

const CustomAlert = ({ text, variant }) => {
    
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(false);
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<div
			className={`custom-alert${show ? " show" : ""}`}
			style={{ top: show ? "0" : "-100px" }}
		>
			<Alert variant={variant}>{text}</Alert>
		</div>
	);
};

export default CustomAlert;
