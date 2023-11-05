import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import btnStyles from "../../styles/Buttons.module.css";
import ConfirmationModal from "../ConfirmationModal";

const SettingsBtn = React.forwardRef(({ onClick }, ref) => (
	<i
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
		className={`${btnStyles.SettingsBtn} fa-solid fa-wrench ml-2`}
	/>
));

const SettingsDropdown = ({ editObject, onDelete }) => {
	const [showModal, setShowModal] = useState(false);

	const handleDeleteClick = () => {
		setShowModal(true);
	};

	const handleConfirmDelete = () => {
		onDelete();
		setShowModal(false);
	};

	return (
		<>
			<Dropdown alignRight>
				<Dropdown.Toggle as={SettingsBtn}></Dropdown.Toggle>
				<Dropdown.Menu
					className="text-right"
					popperConfig={{ strategy: "fixed" }}
				>
					{editObject && (
						<Dropdown.Item onClick={editObject} aria-label="edit">
							Edit
						</Dropdown.Item>
					)}
					{onDelete && (
						<Dropdown.Item
							onClick={handleDeleteClick}
							className="text-danger"
							aria-label="delete"
						>
							Delete
						</Dropdown.Item>
					)}
				</Dropdown.Menu>
			</Dropdown>

			<ConfirmationModal
				show={showModal}
				onHide={() => setShowModal(false)}
				onConfirm={handleConfirmDelete}
			/>
		</>
	);
};

export default SettingsDropdown;
