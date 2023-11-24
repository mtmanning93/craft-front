import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import styles from "../styles/CompanyList.module.css";
import mainStyles from ".././App.module.css";
import { Form, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Loader from "./tools/Loader";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "./Avatar";

/**
 * Displays a list of companies with search functionality.
 * Users can click on a company to view additional details in a modal.
 * Retrives a list of company employees.
 */
function CompanyList() {
	const currentUser = useCurrentUser();

	const [errorMessage, setErrorMessage] = useState("");
	const [companies, setCompanies] = useState([]);
	const [search, setSearch] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [selectedCompany, setSelectedCompany] = useState(null);
	const [modalShow, setModalShow] = useState(false);
	const [employees, setEmployees] = useState([]);

	// Fetches a searchable company list of all site companies.
	useEffect(() => {
		const getCompanyList = async () => {
			try {
				const { data } = await axiosReq.get(
					`/companies/?search=${search}`
				);
				setCompanies(data);
				setLoaded(true);
			} catch (error) {
				setErrorMessage(
					"Having trouble retrieving comapnies at this time."
				);
			}
		};

		setLoaded(false);
		const timeout = setTimeout(() => {
			getCompanyList();
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [search, currentUser]);

	// Gets all employee inastances of the company
	const getEmployeesByCompany = async (companyId) => {
		try {
			const response = await axios.get(
				`/profiles/?employer=${companyId}`
			);
			const profiles = response.data.results;
			setEmployees(profiles);
		} catch (error) {
			setErrorMessage(
				"Having trouble retrieving employees at this time."
			);
		}
	};

	// opens company modal
	const openModal = (company) => {
		setSelectedCompany(company);
		setModalShow(true);
		getEmployeesByCompany(company.id);
	};

	// closes company modal
	const closeModal = () => {
		setSelectedCompany(null);
		setModalShow(false);
	};

	return (
		<>
			<div
				className={`${styles.CompanyListWrapper} ${mainStyles.Content}`}
			>
				<div
					className={`${styles.Heading} d-flex justify-content-between align-items-center`}
				>
					<p className="m-0">
						<i className="fa-solid fa-book mr-2" />
						Company Directory
					</p>
					<OverlayTrigger
						placement="bottom"
						overlay={
							<Popover id="popover-positioned-bottom">
								<Popover.Title>
									Search Company Directory
								</Popover.Title>
								<Popover.Content>
									Search by name or location, or scroll
									through the alphabetized list of companies
									to find employees and more information.
								</Popover.Content>
							</Popover>
						}
					>
						<i className="fa-solid fa-circle-info" />
					</OverlayTrigger>
				</div>
				{/* Displays the search bar form for logged in users */}
				{currentUser && (
					<Form
						onSubmit={(event) => event.preventDefault()}
						className={`${mainStyles.Content} d-flex`}
					>
						<Form.Label htmlFor="search-input" className="sr-only">
							Search companies
						</Form.Label>
						<i className="fa-solid fa-magnifying-glass my-auto mx-2" />
						<Form.Control
							id="search-input"
							type="text"
							placeholder="Search directory..."
							value={search}
							onChange={(event) => setSearch(event.target.value)}
						></Form.Control>
					</Form>
				)}
				{/* displays error message JSX if necessary */}
				{errorMessage && (
					<>
						<p className="text-danger m-0">
							<strong>Unexpected Error:</strong>
						</p>
						<p>
							<em>{errorMessage}</em>
						</p>
					</>
				)}
				{loaded ? (
					<>
						{/* Displays list of companies */}
						{companies.results ? (
							// Infinite scroll component fetches more feed data when necessary
							companies.results.map((company) => (
								<p
									key={company.id}
									onClick={() => openModal(company)}
									className={`${styles.ListCompany} m-0 mt-2 pt-2`}
								>
									<i className="fa-solid fa-house mr-2" />
									{company.name}
									{company.location && (
										<span className="ml-2">
											({company.location})
										</span>
									)}
								</p>
							))
						) : (
							<p>No Companies...</p>
						)}
					</>
				) : (
					<Loader loader variant="dark" />
				)}
			</div>
			{/* Company Modal */}
			<Modal show={modalShow} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						{selectedCompany && selectedCompany.name}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Display company information here */}
					{selectedCompany && (
						<div>
							<p>
								<i className="fa-solid fa-location-dot mr-2" />
								Location: {selectedCompany.location}
							</p>
							<p>
								<i className="fa-solid fa-trowel-bricks mr-2" />
								Type: {selectedCompany.type}
							</p>
							<p>
								<i className="fa-solid fa-users mr-2" />
								Craft Employee's:{" "}
								{selectedCompany.employee_count}
							</p>
							{/* displays error message JSX if necessary */}
							{errorMessage ? (
								<>
									<p className="text-danger m-0">
										<strong>Unexpected Error:</strong>
									</p>
									<p>
										<em>{errorMessage}</em>
									</p>
								</>
							) : (
								<>
									{/* Display list of employee names */}
									<ul className={styles.EmployeeList}>
										{employees.map((profile) => (
											<li
												className="mt-2"
												key={profile.id}
											>
												<Link
													to={`/profiles/${profile.id}`}
												>
													<Avatar
														src={profile.image}
														height={30}
														// className={styles.Avatar}
													/>
													<span className="ml-2">
														{profile.owner}
													</span>
												</Link>
											</li>
										))}
									</ul>
								</>
							)}
						</div>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
}

export default CompanyList;
