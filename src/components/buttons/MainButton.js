import React from "react";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Buttons.module.css"

const MainButton = ({ type, text, onClick, className }) => {
  return (
    <Button
      variant="warning"
      aria-label="button"
      type={type}
      onClick={onClick}
      className={`${btnStyles.Btn} ${className}`}
    >
      {text}
    </Button>
  );
};

export default MainButton;
