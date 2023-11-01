import React, { useEffect, useState } from "react";
import Select from "react-select/dist/declarations/src/Select";
import { axiosReq } from "../../api/axiosDefaults";

const EmployerSelector = () => {
	const [selectedCompany, setSelectedCompany] = useState(value);
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		const getCompanies = async () => {
			try {
				const { data } = await axiosReq.get("/companies");
				const options = data.map((company) => ({
					value: company.pk,
					label: `${company.name} (${company.location})`,
				}));
				setCompanies(options);
			} catch (error) {
				console.log(error);
			}
		};

        getCompanies();
	}, []);

	return <Select 
        name="company"
        value={selectedCompany}
        onChange={(selectedOption) => {
            setSelectedCompany(selectedOption);
            onChange(selectedOption);
        }}
        options={companies}
        isSearchable
        placeholder="Select an employer"
    />;
};

export default EmployerSelector;
