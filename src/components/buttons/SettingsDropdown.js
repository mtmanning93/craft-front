import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import btnStyles from "../../styles/Buttons.module.css";
import ConfirmationModal from "../ConfirmationModal";

/**
 * A dropdown menu with settings options, including edit and delete.
 * @component
 * @param {function} editObject - Function called when the "Edit" option is selected.
 * @param {function} onDelete - Function called when the "Delete" option is selected.
 */
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

    // Shows modal when delete is selected
	const handleDeleteClick = () => {
		setShowModal(true);
	};
    // unshows modal when deletion is confirmed
	const handleConfirmDelete = () => {
		onDelete();
		setShowModal(false);
	};

	return (
		<>
			<Dropdown alignRight title="Settings">
				<Dropdown.Toggle as={SettingsBtn}></Dropdown.Toggle>
				<Dropdown.Menu
					className="text-right"
					popperConfig={{ strategy: "fixed" }}
				>   
                    {/* shows edit option if specified in props */}
					{editObject && (
						<Dropdown.Item onClick={editObject} aria-label="edit">
							Edit
						</Dropdown.Item>
					)}
                    {/* shows delete option if specified in props */}
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
