import React from "react";
import styles from "../../styles/Loader.module.css"
import Spinner from "react-bootstrap/Spinner";

const Loader = ({ loader, src, message, variant }) => {
  return (
    <div className={styles.Loader}>
      {loader && <Spinner animation="border" variant={variant} />}
      {src && <img src={src} alt={message} className="m-2" width="64" height="64" />}
      {message && <p className="m-2">{message}</p>}
    </div>
  );
};

export default Loader;
