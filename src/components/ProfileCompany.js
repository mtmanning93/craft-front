import React from "react";
import { axiosRes } from "../api/axiosDefaults";
import { Col, Row } from "react-bootstrap";
import SettingsDropdown from "./buttons/SettingsDropdown";
import { useLocation } from "react-router-dom";

const ProfileCompany = (props) => {
	const {
		id,
		name,
		type,
		location,
		employee_count,
		setProfileData,
		setProfileCompanies,
	} = props;

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
		<Row className="border-top border-sm-none my-2 pt-2">
			<Col className="d-flex flex-column flex-sm-row">
				<div>
					<i className="fa-solid fa-house mr-2" />
					{name} ({type})
				</div>
				<div>
					<i className="fa-solid fa-location-dot mx-2" />
					{location}
				</div>
				<div className="d-none d-sm-block">
					{employee_count > 0 ? (
						<>
							<i className="fa-solid fa-users mx-2" />
							{employee_count} Craft employees
						</>
					) : (
						<i className="fa-solid fa-user ml-2" />
					)}
				</div>
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
