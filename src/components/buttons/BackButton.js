import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import btnStyles from "../../styles/Buttons.module.css";

/**
 * Renders a button to navigate the user back to the previous page.
 * @component
 */
const BackButton = () => {
  const history = useHistory();

  return (
    <Button aria-label="back button" className={btnStyles.BackBtn} onClick={() => history.goBack()}>
      <i className="fa-solid fa-rotate-left"></i>
    </Button>
  );
};

export default BackButton;
