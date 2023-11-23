import React from "react";
import styles from "../styles/Post.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";
import Avatar from "./Avatar";
import {
	Link,
	useHistory,
	useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import mainStyles from "../App.module.css";
import BackButton from "../components/buttons/BackButton";
import { axiosRes } from "../api/axiosDefaults";
import SettingsDropdown from "./buttons/SettingsDropdown";
import { useErrorContext } from "../contexts/ErrorContext";

/**
 * Represents a post with user details, content, and like controls.
 * @component
 * @param {number} id - A unique post ID.
 * @param {string} owner - post owner username.
 * @param {number} profile_id - post owner's profile pk.
 * @param {string} profile_image - path to the post owner's avatar image.
 * @param {string} profile_job - job title of the post owner.
 * @param {string} profile_location - location of the post owners, employer instance.
 * @param {number} comments_count - number of comments.
 * @param {number} likes_count - number of likes.
 * @param {number} like_id - id of the like associated with the current user.
 * @param {string} title - post title.
 * @param {string} content - post content (description).
 * @param {string} image - path to the main post image.
 * @param {string} updated_on - date and time when the post was last updated.
 * @param {function} setPosts - function to update the list of posts.
 */
const Post = (props) => {
	const { showErrorAlert, showSuccessAlert } = useErrorContext();
	const currentUser = useCurrentUser();

	const {
		id,
		owner,
		profile_id,
		profile_image,
		profile_job,
		profile_location,
		comments_count,
		likes_count,
		like_id,
		title,
		content,
		image,
		updated_on,
		setPosts,
	} = props;

	const currentUrl = useLocation();
	const history = useHistory();

    // checks if the user owns the post instance
	const is_owner = currentUser?.username === owner;
    // Renders the back button depending on where the user is.
	const isPostDetails = currentUrl.pathname.startsWith(`/posts/${id}`);

    // pushes user to the edit post form, when selected.
	const editPost = async () => {
		history.push(`/posts/${id}/edit`);
	};

    // handles the post deletion, updates the post list, shows alert.
	const deletePost = async () => {
		try {
			await axiosRes.delete(`/posts/${id}/`);

			setPosts((prevPosts) => ({
				results: prevPosts.results.filter((post) => post.id !== id),
			}));

			if (isPostDetails) {
				history.push("/");
			}
			showSuccessAlert("Success", "Your post was deleted", "success");
		} catch (err) {
			showErrorAlert(
				"Delete Error",
				`Unable to delete post. ${err.message}`,
				"warning"
			);
		}
	};

    // handles a user unliking a previously liked post, updates likes count.
	const unlikePost = async () => {
		try {
			await axiosRes.delete(`/likes/${like_id}/`);
			setPosts((prevPosts) => ({
				...prevPosts,
				results: prevPosts.results.map((post) => {
					return post.id === id
						? {
								...post,
								likes_count: post.likes_count - 1,
								like_id: null,
						  }
						: post;
				}),
			}));
		} catch (err) {
			showErrorAlert(
				"Unexpected Error",
				`Unable to unlike post. ${err.message}`,
				"warning"
			);
		}
	};
    // handles a user liking a post, updates likes count.
	const likePost = async () => {
		try {
			const { data } = await axiosRes.post("/likes/", { post: id });
			setPosts((prevPosts) => ({
				...prevPosts,
				results: prevPosts.results.map((post) => {
					return post.id === id
						? {
								...post,
								likes_count: post.likes_count + 1,
								like_id: data.id,
						  }
						: post;
				}),
			}));
		} catch (err) {
			showErrorAlert(
				"Unexpected Error",
				`Unable to like post. ${err.message}`,
				"warning"
			);
		}
	};

	return (
		<Card className={`mt-3 ${mainStyles.Content}`}>
			<Card.Header>
				<Row className="m-2 mb-3 flex-column-reverse flex-sm-row align-items-center justify-content-between">
					<Link
						to={`/profiles/${profile_id}`}
						className={`mr-auto ${styles.Author}`}
					>
						<Avatar src={profile_image} height={55} />
						<div className="ml-2">
							<Card.Title>{owner}</Card.Title>
							<Card.Subtitle className={`${styles.Job} mb-2`}>
								{profile_job && profile_job}
								{profile_location && (
									<span className="ml-1">
										<i className="fa-solid fa-location-dot"></i>
										{profile_location}
									</span>
								)}
							</Card.Subtitle>
						</div>
					</Link>
					<div className="ml-auto d-flex align-items-center justify-content mb-auto">
						<p className="d-none d-lg-block mb-0 mr-3">
							{updated_on}
						</p>
						{is_owner && (
							<SettingsDropdown
								editObject={editPost}
								onDelete={deletePost}
							/>
						)}

						{isPostDetails && <BackButton />}
					</div>
				</Row>
				<p className="d-block d-lg-none mx-2">{updated_on}</p>
				{title && (
					<Card.Text as="h3" className="m-2">
						{title}
					</Card.Text>
				)}

				{content && (
					<Card.Text className={styles.Description}>
						{content}
					</Card.Text>
				)}
			</Card.Header>
			<Card.Body className="p-0 py-sm-2 text-center">
				<Link to={`/posts/${id}`}>
					<Card.Img
						className={styles.Img}
						src={`${image.replace(
							"/upload/",
							"/upload/f_auto,q_auto,c_fill,h_525,w_auto/"
						)}`}
						alt={title}
						width="auto"
						height="100%"
						preload="auto"
					/>
				</Link>
			</Card.Body>
			<Card.Footer className="d-flex align-items-center justify-content-end px-2 px-sm-3">
				<div className={styles.Controls}>
					<span className={styles.Count}>{comments_count}</span>
					<OverlayTrigger
						placement="bottom"
						overlay={<Tooltip>Join the discusion below.</Tooltip>}
					>
						<span className={styles.CommentIcon}>
							<i className="fa-solid fa-message fa-sm"></i>
						</span>
					</OverlayTrigger>
					<span className={styles.Count}>{likes_count}</span>
                    {/* like tooltip conditional rendering */}
					{like_id ? (
						<OverlayTrigger
							placement="bottom"
							overlay={<Tooltip>Unlike this post.</Tooltip>}
						>
							<span
								className={styles.LikeIcon}
								onClick={unlikePost}
							>
								<i
									className="fa-solid fa-thumbs-up"
									title="Unlike button"
								/>
							</span>
						</OverlayTrigger>
					) : currentUser ? (
						<OverlayTrigger
							placement="bottom"
							overlay={<Tooltip>Like this post.</Tooltip>}
						>
							<span
								className={styles.LikeIcon}
								onClick={likePost}
								title="Like button"
							>
								<i className="fa-regular fa-thumbs-up" />
							</span>
						</OverlayTrigger>
					) : (
						<OverlayTrigger
							placement="bottom"
							overlay={
								<Tooltip>
									You must login or signup to like posts.
								</Tooltip>
							}
						>
							<i
								className="fa-regular fa-thumbs-up"
								title="Login or sign up to like"
							/>
						</OverlayTrigger>
					)}
				</div>
			</Card.Footer>
		</Card>
	);
};

export default Post;
