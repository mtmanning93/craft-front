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

	const is_owner = currentUser?.username === owner;
	const isPostDetails = currentUrl.pathname.startsWith(`/posts/${id}`);

	const editPost = async () => {
		history.push(`/posts/${id}/edit`);
	};

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
			console.log(err);
			showErrorAlert(
				"Delete Error",
				`Unable to delete post. ${err.message}`,
				"warning"
			);
		}
	};

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
			console.log(err);
			showErrorAlert(
				"Unexpected Error",
				`Unable to unlike post. ${err.message}`,
				"warning"
			);
		}
	};

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
			console.log(err);
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
						<p className="d-none d-md-block mb-0 mr-3">
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
				<p className="d-block d-md-none mx-2">{updated_on}</p>
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
			<Card.Body className="px-0 py-2 text-center">
				<Link to={`/posts/${id}`}>
					<Card.Img
						className={styles.Img}
						src={`${image.replace("/upload/", "/upload/f_auto,c_fill,h_525,w_auto/")}`}
						alt={title}
						width="auto"
						height="100%"
						preload="auto"
					/>
				</Link>
			</Card.Body>
			<Card.Footer className="d-flex align-items-center justify-content-end">
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
