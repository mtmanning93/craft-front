import React from "react";
import { axiosRes } from "../api/axiosDefaults";
import { Col, Row } from "react-bootstrap";
import SettingsDropdown from "./buttons/SettingsDropdown";
import { useLocation } from "react-router-dom";

const ProfileCompany = (props) => {
	const { id, name, type, location, employee_count, setProfileData, setProfileCompanies } = props;

	const currentUrl = useLocation().pathname;

	const deleteCompany = async () => {
		try {
			await axiosRes.delete(`/companies/${id}`);

			// Update the profile data to remove the company from the list
			setProfileData((prevProfileData) => {
				return {
					...prevProfileData,
					companies: prevProfileData.companies.filter(
						(company) => company.id !== id
					),
				};
			});

			// Update list of profileCompanies
			setProfileCompanies((prevCompanies) =>
				prevCompanies.filter((company) => company.id !== id)
			);
		} catch (error) {
			console.error("Error deleting company:", error);
		}
	};

	return (
		<Row className="my-2">
			<Col>
				<i className="fa-solid fa-house mr-2" />
				{name} ({type})
				<i className="fa-solid fa-location-dot mx-2" />
				{location}
				{employee_count > 0 ? (
					<>
						<i className="fa-solid fa-users mx-2" />
						{employee_count} Craft employees
					</>
				) : (
					<i className="fa-solid fa-user ml-2" />
				)}
			</Col>
			{currentUrl.includes("edit") && (
				<Col className="d-flex justify-content-end" xs={2}>
					<SettingsDropdown
						editObject={() => {}}
						onDelete={deleteCompany}
					/>
				</Col>
			)}
		</Row>
	);
};

export default ProfileCompany;
