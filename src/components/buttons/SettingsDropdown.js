import React from "react";
import { Dropdown } from "react-bootstrap";
import btnStyles from "../../styles/Buttons.module.css";

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

const SettingsDropdown = ({ editObject, deleteObject }) => {
	return (
		<Dropdown alignRight>
			<Dropdown.Toggle as={SettingsBtn}></Dropdown.Toggle>
			<Dropdown.Menu className="text-right">
				<Dropdown.Item onClick={editObject} aria-label="edit">
					Edit
				</Dropdown.Item>
				<Dropdown.Item
					onClick={deleteObject}
					className="text-danger"
					aria-label="delete"
				>
					Delete
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default SettingsDropdown;
