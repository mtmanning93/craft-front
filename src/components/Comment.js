import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "./Avatar";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import SettingsDropdown from "./buttons/SettingsDropdown";
import { axiosRes } from "../api/axiosDefaults";
import { useErrorContext } from "../contexts/ErrorContext";

/**
 * Component representing a comment with user details, content, and delete functionality.
 * @component
 * @param {str} owner - The username of the comment owner.
 * @param {number} profile_id - The ID of the comment owner's profile.
 * @param {str} profile_image - The path to the comment owner's avatar image.
 * @param {str} created_on - The timestamp indicating when the comment was created.
 * @param {str} content - The content of the comment.
 * @param {number} id - The unique ID of the comment.
 * @param {function} setPost - Function to update the post containing the comment.
 * @param {function} setComments - Function to update the list of comments.
 */
const Comment = (props) => {
	const user = useCurrentUser();
	const { showErrorAlert } = useErrorContext();

	const {
		owner,
		profile_id,
		profile_image,
		created_on,
		content,
		id,
		setPost,
		setComments,
	} = props;

    // Checks if the user is the owner
	const is_owner = user?.username === owner;

    // Handles the comment deletion
    // Updates the posts comment count and comments list
	const deleteComment = async () => {
		try {
			await axiosRes.delete(`/comments/${id}`);

			setPost((prevPost) => ({
				results: [
					{
						...prevPost.results[0],
						comments_count: prevPost.results[0].comments_count - 1,
					},
				],
			}));

			setComments((prevComments) => ({
				results: prevComments.results.filter(
					(comment) => comment.id !== id
				),
			}));
		} catch (err) {
			showErrorAlert(
				"Delete Error",
				`Unable to delete comment. ${err.message}`,
				"warning"
			);
		}
	};

	return (
		<Container fluid className="d-flex align-items-center border-top py-2">
			<Link to={`/profiles/${profile_id}`}>
				<Avatar src={profile_image} height={40} />
			</Link>
			<Col className="m-1 p-0">
				<div className="d-flex justify-content-between">
					<strong>
						{owner}
						<i className="fa-regular fa-message text-muted mx-2" />
						<span className="text-muted">{created_on}</span>
					</strong>
					<div>
						{is_owner && (
							<SettingsDropdown onDelete={deleteComment} />
						)}
					</div>
				</div>
				<div>{content}</div>
			</Col>
		</Container>
	);
};

export default Comment;
