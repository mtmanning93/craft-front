import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
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
import CompanyList from "../components/CompanyList";

/**
 * The post details 'page' for displaying details of a selecte post.
 * Including listing the post comments below the post.
 */
const PostDetails = () => {
	const { showErrorAlert } = useErrorContext();
	const currentUser = useCurrentUser();

	const [post, setPost] = useState({ results: [] });
	const [comments, setComments] = useState({ results: [] });
	const [loaded, setLoaded] = useState(false);
	const [commentFeedErrors, setCommentFeedErrors] = useState("");

	const { id } = useParams();
	const history = useHistory();

    // used to populate the post avatar
	const profile_image = currentUser?.profile_image;

    // Sets post data for the component on mount, including comments list related to the post.
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
				if (
					err.response.status === 400 ||
					err.response.status === 404
				) {
					showErrorAlert(
						`${err.response.status} error!`,
						"Requested post could not be found or does not exist.",
						"warning"
					);
					history.push("/page-not-found");
				} else {
					showErrorAlert(
						`${err.response.status} error!`,
						`${err.message}`,
						"warning"
					);
					history.push("/");
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
                {/* Shows spinner until data is loaded. */}
				{loaded ? (
					<>
                        {/* Shows post with all related post details */}
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
                                // Infinite scroll component to list all comments in a paginated form.
								<InfiniteScroll
									dataLength={comments.results.length}
									next={() =>
										fetchMoreData(
											comments,
											setComments,
											setCommentFeedErrors
										)
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
                                    {/* If comment feed has erros displays the erros */}
									{commentFeedErrors && (
										<div className="m-2">
											<p className="text-warning mb-0">
												<strong>
													Unexpected Feed Error:
												</strong>
											</p>
											<p>{commentFeedErrors}</p>
										</div>
									)}
								</InfiniteScroll>
							) : currentUser ? (
                                // Message if no comments yet and user is logged in
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
                                // Message if no comments yet and the user is logged out
								<>
									<h2 className="border-bottom pb-2 m-2 ml-4">
										No comments yet
									</h2>
									<p className="m-2 ml-4">
										<Link to="/login"><strong>Login</strong></Link> or{" "}
										<Link to="/signup"><strong>signup</strong></Link> to
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
			<Col md={4} className="d-none d-md-block pr-0">
				<Col
					className={`${stylesW.WotwContainer} ${mainStyles.Content} bg-warning border-dark mt-3 p-0`}
				>
					<p className={`${stylesW.Heading} m-0 mt-2 ml-2`}>
						Work of the week
					</p>
					<p className="mx-2 mb-0">The most liked work right now.</p>
					<WorkOfTheWeek />
				</Col>
				<div>
					<CompanyList />
				</div>
			</Col>
		</Row>
	);
};

export default PostDetails;
