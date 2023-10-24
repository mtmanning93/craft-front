import React from "react";
import { Button } from "react-bootstrap";
import styles from "../styles/ActionButton.module.css"

const ActionButton = ({ variant, size, type, text, block, onClick, className }) => {
  return (
    <Button
      variant={variant}
      size={size}
      type={type}
      block={block}
      onClick={onClick}
      className={`${styles.Btn} ${className}`}
    >
      {text}
    </Button>
  );
};

export default ActionButton;
