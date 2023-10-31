import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../api/axiosDefaults";
import Loader from "../components/tools/Loader";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchMoreData from "../components/tools/InfiniteScroll";
import WorkOfTheWeek from "../components/WorkOfTheWeek";
import stylesW from "../styles/WotW.module.css";
import mainStyles from "../App.module.css";

const Feed = () => {
	const [posts, setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const currentUrl = useLocation().pathname;

	const user = useCurrentUser();
	const user_id = user?.profile_id;
	// console.log("User:", user);
	// console.log("UserID:", user_id);
	// May need to be called inside the App.js file see Bug Reports 

	const noFeedMessage =
		currentUrl === "/feed" ? (
			<div className="m-2">
				<h1>No posts yet! You do no follow anybody.</h1>
				<p>
					You must follow others to show all their posts here.{" "}
					<Link className="text-warning" to="/">
						Get started here.
					</Link>
				</p>
			</div>
		) : (
			<div>
				<h1>No posts yet! You have not liked any posts.</h1>
				<p>
					You must like others posts to show all your liked posts
					here.{" "}
					<Link className="text-warning" to="/">
						Get started here.
					</Link>
				</p>
			</div>
		);

	useEffect(() => {
		let filter = "";
		if (user_id) {
			const getPosts = async () => {
				try {
					if (currentUrl === "/feed") {
						filter = `owner__followed__owner__profile=${user_id}&`;
					} else if (currentUrl === "/liked") {
						filter = `like__owner__profile=${user_id}&ordering=-like__created_on&`;
					}

					const { data } = await axiosReq.get(`/posts/?${filter}`);
					setPosts(data);
					setLoaded(true);
				} catch (error) {
					console.error(error);
				}
			};

			setLoaded(false);
			getPosts();
		}
	}, [currentUrl, user_id]);

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
						{posts.results.length ? (
							<InfiniteScroll
								dataLength={posts.results.length}
								next={() => fetchMoreData(posts, setPosts)}
								hasMore={!!posts.next}
								loader={<Loader loader />}
								endMessage={<p>No more posts to load...</p>}
							>
								{posts.results.map((post) => (
									<Post
										key={post.id}
										{...post}
										setPosts={setPosts}
									/>
								))}
							</InfiniteScroll>
						) : (
							noFeedMessage
						)}
					</>
				) : (
					<Loader loader />
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

export default Feed;
