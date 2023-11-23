import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import Loader from "../components/tools/Loader";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchMoreData from "../components/tools/InfiniteScroll";
import WorkOfTheWeek from "../components/WorkOfTheWeek";
import mainStyles from "../App.module.css";
import stylesW from "../styles/WotW.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../contexts/CurrentUserContext";

/**
 * A feed component for displaying all site posts.
 * Used as landing page and 'Discover' feed for logged in users.
 */
const DefaultFeed = () => {
	const currentUser = useCurrentUser();

	const [posts, setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [search, setSearch] = useState("");
	const [feedErrorMessage, setFeedErrorMessage] = useState("");
	const [noResultsMessage, setNoResultsMessage] = useState("");

    // Message for if there are no posts to display.
	const noFeedMessage = (
		<div className="m-2">
			<h1>No posts yet! You must create a post.</h1>
			<p>
				Create some posts for others to discover your work.
				<Link className="text-warning" to="/posts/create/">
					Get started here.
				</Link>
			</p>
		</div>
	);
    
    // Fetches posts to display in the feed.
    // Sets loaded to true if data is fetched.
	useEffect(() => {
		const getDefaultFeed = async () => {
			try {
				const { data } = await axiosReq.get(`/posts/?search=${search}`);
				setPosts(data);
				setLoaded(true);
				setFeedErrorMessage("");

				if (data.results.length === 0) {
					setNoResultsMessage(
						search.trim() !== "" ? "No results found!" : ""
					);
				} else {
					setNoResultsMessage("");
				}
			} catch (err) {
				setFeedErrorMessage(
					"Currently unable to retrieve feed data, please refresh the feed, or try again soon."
				);
			}
		};

        // sets loaded to false for 1 second, for use when the user types in the search input.
        // prevents multiple rendering.
		setLoaded(false);
		const timeout = setTimeout(() => {
			getDefaultFeed();
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [search, currentUser]);

	return (
		<Row className="w-100 px-2 px-sm-4">
			<Col className="px-0 pr-md-4">
                {/* Small screens Work of the Week component. */}
				<Row
					className={`${mainStyles.Content} bg-warning border-dark m-0 mt-3 d-md-none`}
				>
					<p className={`${stylesW.Heading} mb-0 mt-2 ml-3 ml-sm-4`}>
						Work of the week
					</p>
					<WorkOfTheWeek />
				</Row>

                {/* Displays the search bar form for logged in users */}
				{currentUser && (
					<Form
						onSubmit={(event) => event.preventDefault()}
						className={`${mainStyles.Content} mt-3 d-flex`}
					>
						<Form.Label htmlFor="search-input" className="sr-only">
							Search Feed
						</Form.Label>
						<i className="fa-solid fa-magnifying-glass my-auto mx-2" />
						<Form.Control
							id="search-input"
							type="text"
							placeholder="Search feed..."
							value={search}
							onChange={(event) => setSearch(event.target.value)}
						></Form.Control>
					</Form>
				)}
                {/* Displays feed error messages if necessary */}
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
                            // Infinite scroll component fetches more feed data when necessary
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
								endMessage={
									<strong>No more posts to load...</strong>
								}
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
            {/* Large screens work of the week component */}
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

export default DefaultFeed;
