import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text, className }) => {
  return (
    <span>
        <img
            className={`${styles.Avatar} ${className}`}
            src={src}
            height={height}
            width={height}
            alt="user profile avatar"
        />
        <span className="d-none d-sm-inline">{text}</span>
    </span>
  );
};

export default Avatar;
