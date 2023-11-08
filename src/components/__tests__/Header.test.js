import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../Header";
import { ErrorProvider } from "../../contexts/ErrorContext";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test("renders Header for logged out users", async () => {
	render(
		<Router>
				<ErrorProvider>
					<Header />
				</ErrorProvider>
		</Router>
	);

    const welcomeMessage = await screen.findByText("Welcome to Craft Social!")
    expect(welcomeMessage).toBeInTheDocument();

    const signupLink = await screen.findByRole('link', {name: 'Sign up'})
    expect(signupLink).toBeInTheDocument(); 
});

test("renders tab links to other feeds for logged in users", async () => {
	render(
		<Router>
			<CurrentUserProvider>
				<ErrorProvider>
					<Header />
				</ErrorProvider>
			</CurrentUserProvider>
		</Router>
	);

    const feedTab = await screen.findByText("Feed");
    const likedTab = await screen.findByText("Liked");
    const topTab = await screen.findByText("Top");
    expect(feedTab).toBeInTheDocument();
    expect(likedTab).toBeInTheDocument();
    expect(topTab).toBeInTheDocument();
});
