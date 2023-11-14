import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MainButton from "../../components/buttons/MainButton";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import mainStyles from "../../App.module.css";

const CommentForm = (props) => {
	const user = useCurrentUser();

	const { post, setPost, setComments, profile_image, profile_id } = props;

	const [commentData, setCommentData] = useState("");
	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		setCommentData(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axiosRes.post("/comments/", {
				content: commentData,
				post,
			});

			const data = response.data;

			setComments((prevComments) => ({
				...prevComments,
				results: [data, ...prevComments.results],
			}));

            setPost((prevPost) => ({
				results: [
					{
						...prevPost.results[0],
						comments_count: prevPost.results[0].comments_count + 1,
					},
				],
			}));
			setCommentData("");
		} catch (err) {
			setErrors(err.response?.data);
			if (!errors.comment && !errors.genericError) {
				setErrors({ genericError: "Invalid input, please try again." });
			}
		}
	};

	return (
		<Form
			className="my-2 mx-sm-2 p-2 border-bottom border-dark"
			onSubmit={handleSubmit}
		>
			<Form.Group controlId="formBasicPassword">
				<Link to={`/profiles/${profile_id}`}>
					<Avatar
						src={profile_image}
						textAfter={user.username}
						height={55}
					/>
				</Link>
				<Form.Label className="d-none">Comment</Form.Label>
				<Form.Control
					as="textarea"
					rows={2}
					placeholder="Write a comment..."
					value={commentData}
					name="comment"
					onChange={handleChange}
					className={`mt-2 ${mainStyles.Content}`}
				/>
			</Form.Group>
			{errors.comment?.length ? (
				errors.comment.map((message, idx) => (
					<Alert variant="warning" key={idx}>
						{message}
					</Alert>
				))
			) : errors.genericError ? (
				<Alert variant="warning">{errors.genericError}</Alert>
			) : null}

			<MainButton type="submit" text="Comment" className="ml-auto" />
		</Form>
	);
};

export default CommentForm;
