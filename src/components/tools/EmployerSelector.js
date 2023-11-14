import React, { useEffect, useState } from "react";
import Select from "react-select";
import { axiosReq } from "../../api/axiosDefaults";

const EmployerSelector = ({ value, onChange }) => {

	const [companies, setCompanies] = useState([]);
	const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
    
        const getCompanies = async () => {
          try {
            const response = await axiosReq.get("/companies/");
            const data = response.data.results;
    
            const options = data.map((company) => ({
              value: company.id,
              label: `${company.name} (${company.location})`,
            }));
    
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
