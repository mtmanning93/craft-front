import jwtDecode from "jwt-decode";

/**
 * Sets the expiration timestamp of the refresh token in the local storage.
 * Taken form the Code Institutes 'Moments' walkthrough (see README references)
 * @param {Object} data - The decoded data from the refresh token, typically obtained after a successful token refresh.
 */
export const setTokenTimestamp = (data) => {
	const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
	localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};
// Checks if there is a stored refresh token timestamp in the local storage.
export const shouldRefreshToken = () => {
	return !!localStorage.getItem("refreshTokenTimestamp");
};
// Removes the stored refresh token timestamp from the local storage.
export const removeTokenTimestamp = () => {
	localStorage.removeItem("refreshTokenTimestamp");
};