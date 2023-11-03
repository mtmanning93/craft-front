import React, { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const useErrorContext = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
  const [errorInfo, setErrorInfo] = useState(null);

  const showErrorAlert = (title, message) => {
    setErrorInfo({ title, message });
  };

  const clearErrorAlert = () => {
    setErrorInfo(null);
  };

  return (
    <ErrorContext.Provider value={{ errorInfo, showErrorAlert, clearErrorAlert }}>
      {children}
    </ErrorContext.Provider>
  );
};