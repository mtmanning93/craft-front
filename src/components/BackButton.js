import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BtnStyles from "../styles/Buttons.module.css";

const BackButton = () => {
  const history = useHistory();

  return (
    <Button className={BtnStyles.BackBtn} onClick={() => history.goBack()}>
      <i className="fa-solid fa-xmark"></i>
    </Button>
  );
};

export default BackButton;
