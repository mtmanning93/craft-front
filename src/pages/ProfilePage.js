import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WorkOfTheWeek from "../components/WorkOfTheWeek";
import stylesW from "../styles/WotW.module.css";
import mainStyles from "../App.module.css";
import ProfileCard from "../components/ProfileCard";
import { axiosReq } from "../api/axiosDefaults";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../components/Post";
import Loader from "../components/tools/Loader";
import fetchMoreData from "../components/tools/InfiniteScroll";
import { Link } from "react-router-dom";
import { useErrorContext } from "../contexts/ErrorContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../contexts/CurrentUserContext";

/**
 * ProfilePage component for displaying a user's profile information and posts.
 * Offers user option to edit their profile.
 */
const ProfilePage = () => {
	const { showErrorAlert } = useErrorContext();
	const currentUser = useCurrentUser();

	const [profile, setProfileData] = useState({ results: [] });
	const [profilePosts, setProfilePosts] = useState({ results: [] });
	const [loaded, setLoaded] = useState(false);

	const { id } = useParams();
	const history = useHistory();

	const is_owner = currentUser?.pk.toString() === id;

	// Fetches profile data for the profile page. Including all posts owned by the profile.
	useEffect(() => {
		const getProfileData = async () => {
			try {
				const [{ data: profile }, { data: profilePosts }] =
					await Promise.all([
						axiosReq.get(`/profiles/${id}`),
						axiosReq.get(`/posts/?owner__profile=${id}`),
					]);
				setProfileData({ results: [profile] });
				setProfilePosts(profilePosts);
				setLoaded(true);
			} catch (err) {
				if (
					err.response &&
					(err.response.status === 400 || err.response.status === 404)
				) {
					showErrorAlert(
						`${err.response.status} error!`,
						"Requested profile could not be found or does not exist.",
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
		getProfileData();
	}, [id, history, showErrorAlert]);

	// Message displayed if the user has no owned posts to list
	const noPostsMessage = (
		<div className="m-2">
			<h1>You have no posts yet! Start building.</h1>
			<p>
				You need to create some posts to see results.{" "}
				<Link className="text-warning" to="/posts/create">
					Get started here.
				</Link>
			</p>
		</div>
	);

	// JSX for all posts in the profiles posts feed.
	// Uses infinite scroll for pagination if necessary.
	const profileOwnedPosts = (
		<>
			{profilePosts.results.length ? (
				<InfiniteScroll
					dataLength={profilePosts.results.length}
					next={() => fetchMoreData(profilePosts, setProfilePosts)}
					hasMore={!!profilePosts.next}
					loader={<Loader loader variant="warning" />}
					endMessage={<strong>No more posts to load...</strong>}
				>
					{profilePosts.results.map((post) => (
						<Post
							key={post.id}
							{...post}
							setPosts={setProfilePosts}
						/>
					))}
				</InfiniteScroll>
			) : (
				noPostsMessage
			)}
		</>
	);

	return (
		<Row className="w-100 p-2">
			<Col className="p-0">
				{/* Work of the Week component on small screens */}
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
						<ProfileCard
							{...profile.results[0]}
							setProfileData={setProfileData}
						/>

						{/* Conditionally renders the profiles name unless the user is on their own profile page. */}
						<h1 className="mb-0 mt-3 pb-2 border-bottom">
							{is_owner ? "Your" : profile.results[0].owner}{" "}
							posts:
						</h1>
						{profileOwnedPosts}
					</>
				) : (
					<Loader loader variant="warning" />
				)}
			</Col>
			{/* Work of the Week component on large screens */}
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

export default ProfilePage;
