import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useErrorContext } from "../contexts/ErrorContext";

export const useRedirectUser = (userStatus) => {
	const { showErrorAlert } = useErrorContext();

	const history = useHistory();

	useEffect(() => {
		const handleRedirect = async () => {
			try {
				await axios.post("/dj-rest-auth/token/refresh/");
				if (userStatus === "loggedIn") {
					showErrorAlert(
						"Wrong way",
						"You are already logged in.",
						"info"
					);
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
