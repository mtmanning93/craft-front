import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import Loader from "../components/tools/Loader";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchMoreData from "../components/tools/InfiniteScroll";
import WorkOfTheWeek from "../components/WorkOfTheWeek";
import mainStyles from "../App.module.css";
import stylesW from "../styles/WotW.module.css";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const DefaultFeed = () => {

	const [posts, setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [search, setSearch] = useState("");

	const user = useCurrentUser();

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

	useEffect(() => {
		const getDefaultFeed = async () => {
			try {
				const { data } = await axiosReq.get(`/posts/?search=${search}`);
				setPosts(data);
				setLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};

		setLoaded(false);
		const timeout = setTimeout(() => {
			getDefaultFeed();
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [search]);

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

				{loaded ? (
					<>
						{posts.results.length ? (
							<InfiniteScroll
								dataLength={posts.results.length}
								next={() => fetchMoreData(posts, setPosts)}
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
							</InfiniteScroll>
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
				<WorkOfTheWeek />
			</Col>
		</Row>
	);
};

export default DefaultFeed;
