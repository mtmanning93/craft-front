import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../api/axiosDefaults";
import Post from "../components/Post";
import CommentForm from "./forms/CommentForm";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import mainStyles from "../App.module.css";
import Comment from "../components/Comment";
import fetchMoreData from "../components/tools/InfiniteScroll";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";

const PostDetails = () => {
	const { id } = useParams();

	const currentUser = useCurrentUser();
	const profile_image = currentUser?.profile_image;

	// empty array means you an fetch results or result
	const [post, setPost] = useState({ results: [] });
	const [comments, setComments] = useState({ results: [] });

	const handleMount = async () => {
		try {
			const [{ data: post }, { data: comments }] = await Promise.all([
				axiosReq.get(`/posts/${id}`),
				axiosReq.get(`/comments/?post=${id}`),
			]);
			setPost({ results: [post] });
			setComments(comments);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		handleMount();
	}, [id]);

	return (
		<Row className="w-100 p-2">
			<Col className="p-0">
				<p>WOTW Mobile</p>
				<Post {...post.results[0]} setPosts={setPost} />
				<Container fluid className={`${mainStyles.Content} p-0 mt-2`}>
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
							next={() => fetchMoreData(comments, setComments)}
							hasMore={!!comments.next}
							loader={<Loader loader />}
							endMessage={<p>No more comments to load.</p>}
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
								Comment above to start the coversation...
							</p>
						</>
					) : (
						<>
							<h2 className="border-bottom pb-2 m-2 ml-4">
								No comments yet
							</h2>
							<p className="m-2 ml-4">
								<Link to="/login">Login</Link> or{" "}
								<Link to="/signup">signup</Link> to start the
								conversation...
							</p>
						</>
					)}
				</Container>
			</Col>
			<Col className="border ml-2 d-none d-lg-block" lg={4}>
				<p>WOTW Desktop</p>
			</Col>
		</Row>
	);
};

export default PostDetails;
