import React from "react";
import { axiosRes } from "../api/axiosDefaults";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SettingsDropdown from "./buttons/SettingsDropdown";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useErrorContext } from "../contexts/ErrorContext";

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
	} = props;

	const currentUrl = useLocation().pathname;
	const history = useHistory();

	const editPost = async () => {
		history.push(`/companies/${id}/edit`);
	};

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
					{employee_count > 0 && (
						<>
							<i className="fa-solid fa-users mx-2" />
							{employee_count} Craft employees
						</>
					)}
				</div>
			</Col>
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
