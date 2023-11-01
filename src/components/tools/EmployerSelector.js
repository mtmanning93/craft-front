import React, { useEffect, useState } from "react";
import Select from "react-select";
import { axiosReq } from "../../api/axiosDefaults";

const EmployerSelector = ({ value, onChange }) => {
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		const getCompanies = async () => {
			try {
				const response = await axiosReq.get("/companies/");
				const data = response.data.results;

				const options = data.map((company) => ({
					value: company.id,
					label: `${company.name} (${company.location})`,
				}));

				// Add no employer option
				options.unshift({ value: "", label: "---------" });
                
				setCompanies(options);
			} catch (error) {
				console.log(error);
			}
		};

		getCompanies();
	}, []);

	return (

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
