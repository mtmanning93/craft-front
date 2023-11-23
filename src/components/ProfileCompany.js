import React from "react";
import { axiosRes } from "../api/axiosDefaults";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SettingsDropdown from "./buttons/SettingsDropdown";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useErrorContext } from "../contexts/ErrorContext";

/**
 * A component representing a company in a user's profile with details and interaction controls.
 * @component
 * @param {number} id - unique id of the company.
 * @param {string} name - name of the company.
 * @param {string} type - type of the company e.g. "Roofing".
 * @param {string} location - location of the company.
 * @param {number} employee_count - number of craft users who have set this company as their employer.
 * @param {function} setProfileData - Function to update the user's profile data.
 * @param {function} setProfileCompanies - Function to update the list of profile companies.
 * @param {Object} selectedCompany - currently selected company in the employer dropdown.
 * @param {function} handleSelectedCompanyChange - Function to handle changes in the selected company.
 */
const ProfileCompany = (props) => {
	const { showErrorAlert } = useErrorContext();

	const {
		id,
		name,
		type,
		location,
		employee_count,
		setProfileData,
		setProfileCompanies,
		selectedCompany,
		handleSelectedCompanyChange,
	} = props;

	const currentUrl = useLocation().pathname;
	const history = useHistory();

    // Pushes the user to the edit post form.
	const editPost = async () => {
		history.push(`/companies/${id}/edit`);
	};

    // Handles the deletion of a company, updates profile information and profile
    // company list. Updates the employer select dropdown.
	const deleteCompany = async () => {
		try {
			await axiosRes.delete(`/companies/${id}`);

			setProfileData((prevProfileData) => {
				return {
					...prevProfileData,
					companies: prevProfileData.companies.filter(
						(company) => company.id !== id
					),
				};
			});

			setProfileCompanies((prevCompanies) =>
				prevCompanies.filter((company) => company.id !== id)
			);

			if (selectedCompany && selectedCompany.value === id) {
				handleSelectedCompanyChange("");
			}
		} catch (err) {
			console.error("Error deleting company:", err);
			showErrorAlert(
				"Delete Error",
				`Unable to delete company. ${err.message}`,
				"warning"
			);
		}
	};

	return (
		<Row className="border-top border-sm-none my-2 pt-2">
			<Col className="d-flex flex-column flex-sm-row">
				<div>
					<i className="fa-solid fa-house mr-2" />
					{name} {type && <span>({type})</span>}
				</div>
				<div>
					{location && (
						<>
							<i className="fa-solid fa-location-dot mx-2" />
							{location}
						</>
					)}
				</div>
				<div className="d-none d-sm-block">
                    {/* conditionally renders the number of profiles who have set the company instance as their employer */}
					{employee_count > 0 && (
						<>
							<i className="fa-solid fa-users mx-2" />
							{employee_count} Craft employees
						</>
					)}
				</div>
			</Col>
            {/* renders the settings dropdown when on the edit profile page. */}
			{currentUrl.includes("edit") && (
				<Col className="d-flex justify-content-end" xs={2}>
					<SettingsDropdown
						editObject={editPost}
						onDelete={deleteCompany}
					/>
				</Col>
			)}
		</Row>
	);
};

export default ProfileCompany;
