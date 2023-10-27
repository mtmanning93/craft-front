import React from "react";
import { Modal } from "react-bootstrap";
import MainButton from "./buttons/MainButton";
import btnStyles from "../styles/Buttons.module.css";

const ConfirmationModal = ({ show, onHide, onConfirm }) => {
	return (
		<Modal show={show} onHide={onHide} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title>Confirm Delete</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to delete this? This cannot be undone!
			</Modal.Body>
			<Modal.Footer className="justify-content-center">
				<MainButton
					type="button"
					text="Delete!"
					className={btnStyles.Wide}
					onClick={onConfirm}
				/>
                <span className="btn" onClick={onHide}>
					Cancel
				</span>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmationModal;
