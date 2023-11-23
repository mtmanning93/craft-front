import React from "react";
import styles from "../../styles/Loader.module.css"
import Spinner from "react-bootstrap/Spinner";

/**
 * Loader component that displays a spinner, an image, or a message to indicate loading.
 * @component
 * @param {boolean} loader - when true displays a spinner.
 * @param {string} src - source URL for an image.
 * @param {string} message - text for the message to be displayed.
 * @param {string} variant - Bootstrap variant for the spinner (if loader is true) e.g. "warning".
 */
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
