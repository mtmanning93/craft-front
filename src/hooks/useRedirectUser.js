import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const useRedirectUser = (userStatus) => {
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
					history.push("/");
				}
			}
		};

		handleRedirect();
	}, [history, userStatus]);
};
