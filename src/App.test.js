import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ErrorProvider } from "./contexts/ErrorContext";

test("renders NavBar component", () => {
	render(
		<Router>
			<ErrorProvider>
				<App />
			</ErrorProvider>
		</Router>
	);

	const navElement = screen.getByRole("link", { name: "login" });
	expect(navElement).toBeInTheDocument();
});

test("renders Header component", () => {
	render(
		<Router>
			<ErrorProvider>
				<App />
			</ErrorProvider>
		</Router>
	);

	const headerText = screen.getByText("Welcome to Craft Social!");
	expect(headerText).toBeInTheDocument();
});
