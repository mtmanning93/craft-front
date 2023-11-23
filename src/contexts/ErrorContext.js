import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const useErrorContext = () => {
	return useContext(ErrorContext);
};

/**
 * Manages error-related information and alerts within the application
 * Provides a context for handling and displaying error alerts and success messages.
 * @component
 * @param {ReactNode} props.children - children components to be wrapped by the provider (index.js).
 */
export const ErrorProvider = ({ children }) => {
	const [errorInfo, setErrorInfo] = useState(null);

    // Function to show an error alert
	const showErrorAlert = (title, message, variant) => {
		setErrorInfo({ title, message, variant });
	};

    // Function to show a success alert
	const showSuccessAlert = (title, message, variant) => {
		setErrorInfo({ title, message, variant });
	};

    // Function to clear an alert
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
