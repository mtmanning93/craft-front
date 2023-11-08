import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar";
import { ErrorProvider } from "../../contexts/ErrorContext";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test("renders NavBar", () => {
	render(
		<Router>
			<ErrorProvider>
				<NavBar />
			</ErrorProvider>
		</Router>
	);

	// screen.debug();
	const logInLink = screen.getByRole("link", { name: "login" });
	expect(logInLink).toBeInTheDocument();
});

test("renders link to a users profile for a logged in user", async () => {
	render(
		<Router>
			<CurrentUserProvider>
				<ErrorProvider>
					<NavBar />
				</ErrorProvider>
			</CurrentUserProvider>
		</Router>
	);

    const profileAvatar = await screen.findByText("Profile");
    expect(profileAvatar).toBeInTheDocument();
});

test("renders sign in and sign up buttons again when logged out", async () => {
	render(
		<Router>
			<CurrentUserProvider>
				<ErrorProvider>
					<NavBar />
				</ErrorProvider>
			</CurrentUserProvider>
		</Router>
	);

    const logoutLink = await screen.findByRole('link', { name: 'logout' });
    fireEvent.click(logoutLink)

    const loginLink = await screen.findByRole('link', { name: 'login' });
    const signupLink = await screen.findByRole('button', { name: 'Sign Up' });

    expect(loginLink).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
});
