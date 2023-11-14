import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
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
import { useRedirectUser } from "../hooks/useRedirectUser";

const OtherFeeds = () => {
	useRedirectUser("loggedOut");
	const user = useCurrentUser();

	const [posts, setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [search, setSearch] = useState("");
	const [feedErrorMessage, setFeedErrorMessage] = useState("");
	const [noResultsMessage, setNoResultsMessage] = useState("");

	const currentUrl = useLocation().pathname;

	const user_id = user?.profile_id;

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
		const getPosts = async () => {
			try {
				if (currentUrl === "/feed") {
					filter = `owner__followed__owner__profile=${user_id}&`;
				} else if (currentUrl === "/liked") {
					filter = `like__owner__profile=${user_id}&ordering=-like__created_on&`;
				}

				const { data } = await axiosReq.get(
					`/posts/?${filter}search=${search}`
				);
				setPosts(data);
				setFeedErrorMessage("");
				setLoaded(true);

				if (data.results.length === 0) {
					setNoResultsMessage(
						search.trim() !== "" ? "No results found!" : ""
					);
				} else {
					setNoResultsMessage("");
				}
			} catch (error) {
				setFeedErrorMessage(
					"Currently unable to retrieve feed data, please refresh the feed, or try again soon."
				);
			}
		};

		setLoaded(false);
		const timeout = setTimeout(() => {
			getPosts();
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [currentUrl, search, user_id]);

	return (
		<Row className="w-100 px-2 px-sm-4">
			<Col className="px-0 pr-md-4">
				<Row
					className={`${mainStyles.Content} bg-warning border-dark m-0 mt-3 d-md-none`}
				>
					<p className={`${stylesW.Heading} mb-0 mt-2 ml-3 ml-sm-4`}>
						Work of the week
					</p>
					<WorkOfTheWeek />
				</Row>
				{user && (
					<Form
						onSubmit={(event) => event.preventDefault()}
						className={`${mainStyles.Content} mt-3 d-flex`}
					>
						<i className="fa-solid fa-magnifying-glass my-auto mx-2" />

						<Form.Control
							type="text"
							placeholder="Search feed..."
							value={search}
							onChange={(event) => setSearch(event.target.value)}
						></Form.Control>
					</Form>
				)}
				{feedErrorMessage && (
					<div className="m-2">
						<p className="text-warning mb-0">
							<strong>Unexpected Feed Error:</strong>
						</p>
						<p>{feedErrorMessage}</p>
					</div>
				)}
				{loaded ? (
					<>
						{posts.results.length ? (
							<InfiniteScroll
								dataLength={posts.results.length}
								next={() =>
									fetchMoreData(
										posts,
										setPosts,
										setFeedErrorMessage
									)
								}
								hasMore={!!posts.next}
								loader={<Loader loader variant="warning" />}
								endMessage={<p>No more posts to load...</p>}
							>
								{posts.results.map((post) => (
									<Post
										key={post.id}
										{...post}
										setPosts={setPosts}
									/>
								))}
								{feedErrorMessage && (
									<div className="m-2">
										<p className="text-warning mb-0">
											<strong>
												Unexpected Feed Error:
											</strong>
										</p>
										<p>{feedErrorMessage}</p>
									</div>
								)}
							</InfiniteScroll>
						) : noResultsMessage ? (
							<div className="m-2">
								<h1 className="mb-0">{noResultsMessage}</h1>
								<p className="text-warning">
									<strong>
										Please change your search query...
									</strong>
								</p>
							</div>
						) : (
							noFeedMessage
						)}
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
				<p className="mx-2 mb-0">The most liked work right now.</p>
				<WorkOfTheWeek />
			</Col>
		</Row>
	);
};

export default OtherFeeds;
