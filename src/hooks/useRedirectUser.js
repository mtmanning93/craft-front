import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useErrorContext } from "../contexts/ErrorContext";

/**
 * Custom React hook for redirecting users based on their authentication status.
 * Taken form the Code Institutes 'Moments' walkthrough (see README references)
 * @param {string} userStatus - authentication status of the user ("loggedIn" or "loggedOut").
 */
export const useRedirectUser = (userStatus) => {
	const { showErrorAlert } = useErrorContext();

	const history = useHistory();

	useEffect(() => {
		const handleRedirect = async () => {
			try {
				await axios.post("/dj-rest-auth/token/refresh/");
				if (userStatus === "loggedIn") {
					history.push("/");
				}
			} catch (error) {
				if (userStatus === "loggedOut") {
					showErrorAlert(
						"Unauthorized access",
						"You do not have authorization to access this resource.",
						"warning"
					);
					history.push("/");
				}
			}
		};
		handleRedirect();
	});
};
