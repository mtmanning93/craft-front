import {
	render,
	screen,
	act,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import { ErrorProvider } from "../../contexts/ErrorContext";
import Post from "../Post";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test("renders correct post details", async () => {
	const mockPost = {
		id: 1,
		owner: "Test Name",
		profile_id: 123,
		profile_image: "path-to-image",
		title: "Post title and image alt text",
		content: "Test content for post",
	};

	render(
		<Router>
			<ErrorProvider>
				<Post {...mockPost} />
			</ErrorProvider>
		</Router>
	);

	const profileAvatar = await screen.findByAltText("user profile avatar");
	expect(profileAvatar).toBeInTheDocument();

	const postOwner = screen.getByText("Test Name");
	const postContent = screen.getByText("Test content for post");
	const postImage = screen.getByAltText("Post title and image alt text");
	const likeButton = screen.getByTitle("login or sign up to like");
	expect(postOwner).toBeInTheDocument();
	expect(postContent).toBeInTheDocument();
	expect(postImage).toBeInTheDocument();
	expect(likeButton).toBeInTheDocument();
});

test("renders post like button for logged in user", async () => {
	const mockPost = {
		id: 1,
		owner: "Test Name",
		profile_id: 123,
		profile_image: "path-to-image",
		content: "Test content for post",
	};

	render(
		<Router>
			<CurrentUserProvider>
				<ErrorProvider>
					<Post {...mockPost} />
				</ErrorProvider>
			</CurrentUserProvider>
		</Router>
	);

	const likeButton = await screen.findByTitle("like");
	expect(likeButton).toBeInTheDocument();
});

test("renders like and comment count based on post counters", async () => {
	const mockPost = {
		id: 1,
		owner: "Test Name",
		profile_id: 123,
		profile_image: "path-to-image",
		content: "Test content for post",
		likes_count: 2,
		comments_count: 12,
	};

	await act(async () => {
		render(
			<Router>
				<CurrentUserProvider>
					<ErrorProvider>
						<Post {...mockPost} />
					</ErrorProvider>
				</CurrentUserProvider>
			</Router>
		);
	});

	const likeCount = await screen.findByText("2");
	const commentCount = await screen.findByText("12");
	expect(likeCount).toBeInTheDocument();
	expect(commentCount).toBeInTheDocument();
});
