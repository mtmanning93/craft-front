import React from "react";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Buttons.module.css"

/**
 * Customizable main site action button with a warning variant.
 * @component
 * @param {string} type - standard button type attribute.
 * @param {string} text - text displayed on the button.
 * @param {function} onClick - Function to be called when the button is clicked.
 * @param {string} className - additional CSS.
 */
const MainButton = ({ type, text, onClick, className }) => {
  return (
    <Button
      variant="warning"
      aria-label="action button"
      type={type}
      onClick={onClick}
      className={`${btnStyles.Btn} ${className}`}
    >
      {text}
    </Button>
  );
};

export default MainButton;
