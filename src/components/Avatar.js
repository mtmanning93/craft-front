import React from "react";
import styles from "../styles/Avatar.module.css";

/**
 * Displays a users' profile avatar.
 * @component
 * @param {string} src - The path to the avatar image.
 * @param {number} height=45 - Avatar height
 * @param {string} textBefore - Displays text before the avatar (visible on larger screens).
 * @param {string} textAfter - Displays text after the avatar (visible on larger screens).
 * @param {string} className - Additional CSS.
 */
const Avatar = ({ src, height = 45, textBefore, textAfter, className }) => {
	const avatarSrc = src
		? src.replace("/upload/", "/upload/f_auto,q_auto/")
		: null;
	return (
		<span className={styles.Wrapper}>
			<span className="d-none d-sm-inline">{textBefore}</span>
			<img
				className={`${styles.Avatar} ${className}`}
				src={avatarSrc}
				height={height}
				width={height}
				alt="user profile avatar"
			/>
			<span className="d-none d-sm-inline text-dark">{textAfter}</span>
		</span>
	);
};

export default Avatar;
