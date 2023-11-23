import React, { useEffect, useState } from "react";
import Select from "react-select";
import { axiosReq } from "../../api/axiosDefaults";

/**
 * A dropdown selector for choosing employers.
 * @component
 * @param {Object} value - The selected option backend value.
 * @param {Function} onChange - callback function invoked when changing selection.
 */
const EmployerSelector = ({ value, onChange }) => {
	const [companies, setCompanies] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

        // Fetches the list of companies to display in the selector dropdown.
		const getCompanies = async () => {
			try {
				const response = await axiosReq.get("/companies/");
				const data = response.data.results;

				const options = data.map((company) => ({
					value: company.id,
					label: company.location
						? `${company.name} (${company.location})`
						: company.name,
				}));

                // Adds an option to allow users to unselect an employer.
				options.unshift({ value: "", label: "---------" });

				if (isMounted) {
					setCompanies(options);
					setError(null);
				}
			} catch (err) {
				if (isMounted) {
					setError("Currently unable to retrieve company list");
				}
			}
		};

		getCompanies();

		return () => {
			isMounted = false;
		};
	}, []);

	if (error) {
		return <p className="text-danger">{error}</p>;
	}

	return (
        // Renders the react-select selector with companies list
		<Select
			name="company"
			value={value}
			onChange={(selectedOption) => {
				onChange(selectedOption);
			}}
			options={companies}
			isSearchable
			aria-label="employer selector"
		/>
	);
};

export default EmployerSelector;
