import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const useErrorContext = () => {
	return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
	const [errorInfo, setErrorInfo] = useState(null);

	const showErrorAlert = (title, message, variant) => {
		setErrorInfo({ title, message, variant });
	};

	const showSuccessAlert = (title, message, variant) => {
		setErrorInfo({ title, message, variant });
	};

	const clearErrorAlert = () => {
		setErrorInfo(null);
	};

	return (
		<ErrorContext.Provider
			value={{
				errorInfo,
				showErrorAlert,
				showSuccessAlert,
				clearErrorAlert,
			}}
		>
			{children}
		</ErrorContext.Provider>
	);
};
