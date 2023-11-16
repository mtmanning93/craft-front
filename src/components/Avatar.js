import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, textBefore, textAfter, className }) => {

    const avatarSrc = src ? src.replace("/upload/", "/upload/f_auto,q_auto/") : null;
  return (
    <span>
        <span className="d-none d-sm-inline">{textBefore}</span>
        <img
            className={`${styles.Avatar} ${className}`}
            src={avatarSrc}
            height={height}
            width={height}
            alt="user profile avatar"
        />
        <span className="d-none d-sm-inline">{textAfter}</span>
    </span>
  );
};

export default Avatar;
