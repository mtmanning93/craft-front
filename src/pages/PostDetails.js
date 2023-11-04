import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import Post from "../components/Post";
import CommentForm from "./forms/CommentForm";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import mainStyles from "../App.module.css";
import stylesW from "../styles/WotW.module.css";
import Comment from "../components/Comment";
import fetchMoreData from "../components/tools/InfiniteScroll";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/tools/Loader";
import WorkOfTheWeek from "../components/WorkOfTheWeek";
import { useErrorContext } from "../contexts/ErrorContext";

const PostDetails = () => {
	const [post, setPost] = useState({ results: [] });
	const [comments, setComments] = useState({ results: [] });
	const [loaded, setLoaded] = useState(false);

	const { showErrorAlert } = useErrorContext();

	const { id } = useParams();

	const history = useHistory();

	const currentUser = useCurrentUser();
	const profile_image = currentUser?.profile_image;

	useEffect(() => {
		const handleMount = async () => {
			try {
				const [{ data: post }, { data: comments }] = await Promise.all([
					axiosReq.get(`/posts/${id}`),
					axiosReq.get(`/comments/?post=${id}`),
				]);
				setPost({ results: [post] });
				setComments(comments);
				setLoaded(true);
			} catch (err) {
                console.log(err);
                if (err.response.status === 400 || err.response.status === 404) {
				showErrorAlert(
					`Error ${err.response.status}`,
					"Requested post could not be found or does not exist.",
					"warning"
				);
				history.push("/page-not-found");
                } else {
                    showErrorAlert(
                        `Error ${err.response.status}`,
                        `${err.message}`,
                        "warning"
                    );
                }
			}
		};
		setLoaded(false);
		handleMount();
	}, [history, id, showErrorAlert]);

	return (
		<Row className="w-100 p-2">
			<Col className="p-0">
				<Row
					className={`${mainStyles.Content} bg-warning border-dark m-0 mt-3 d-md-none`}
				>
					<p className={`${stylesW.Heading} mb-0 mt-2 ml-3 ml-sm-4`}>
						Work of the week
					</p>
					<WorkOfTheWeek />
				</Row>
				{loaded ? (
					<>
						<Post {...post.results[0]} setPosts={setPost} />

						<Container
							fluid
							className={`${mainStyles.Content} p-0 mt-2`}
						>
							{currentUser ? (
								<CommentForm
									profile_id={currentUser.profile_id}
									profile_image={profile_image}
									post={id}
									setPost={setPost}
									setComments={setComments}
								/>
							) : comments.results.length ? (
								<h2 className="m-2 ml-4">Comments</h2>
							) : null}

							{comments.results.length ? (
								<InfiniteScroll
									dataLength={comments.results.length}
									next={() =>
										fetchMoreData(comments, setComments)
									}
									hasMore={!!comments.next}
									loader={<Loader loader variant="warning" />}
								>
									{comments.results.map((comment) => (
										<Comment
											key={comment.id}
											{...comment}
											setPost={setPost}
											setComments={setComments}
										/>
									))}
								</InfiniteScroll>
							) : currentUser ? (
								<>
									<h2 className="border-bottom pb-2 m-2 ml-4">
										Got something to say?
									</h2>
									<p className="m-2 ml-4">
										Comment above to start the
										coversation...
									</p>
								</>
							) : (
								<>
									<h2 className="border-bottom pb-2 m-2 ml-4">
										No comments yet
									</h2>
									<p className="m-2 ml-4">
										<Link to="/login">Login</Link> or{" "}
										<Link to="/signup">signup</Link> to
										start the conversation...
									</p>
								</>
							)}
						</Container>
					</>
				) : (
					<Loader loader variant="warning" />
				)}
			</Col>
			<Col
				className={`${stylesW.WotwContainer} ${mainStyles.Content} bg-warning border-dark ml-2 mt-3 p-0 d-none d-md-block`}
				md={4}
			>
				<p className={`${stylesW.Heading} m-0 mt-2 ml-2`}>
					Work of the week
				</p>
				<WorkOfTheWeek />
			</Col>
		</Row>
	);
};

export default PostDetails;
