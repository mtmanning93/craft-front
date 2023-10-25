import React from "react";
import { Button } from "react-bootstrap";
import btnStyles from "../../styles/Buttons.module.css"

const MainButton = ({ type, text, onClick, className }) => {
  return (
    <Button
      variant="warning"
      type={type}
      onClick={onClick}
      className={`${btnStyles.Btn} ${className}`}
    >
      {text}
    </Button>
  );
};

export default MainButton;
