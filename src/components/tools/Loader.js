import React from "react";
import styles from "../../styles/Loader.module.css"
import { Spinner } from "react-bootstrap";

const Loader = ({ loader, src, message, variant }) => {
  return (
    <div className={styles.Loader}>
      {loader && <Spinner animation="border" variant={variant} />}
      {src && <img src={src} alt={message} className="m-2"/>}
      {message && <p className="m-2">{message}</p>}
    </div>
  );
};

export default Loader;
