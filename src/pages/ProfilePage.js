import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
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

const ProfilePage = () => {
	const { showErrorAlert } = useErrorContext();

	const [profile, setProfileData] = useState({ results: [] });
	const [profilePosts, setProfilePosts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [feedErrorMessage, setFeedErrorMessage] = useState("");

	const { id } = useParams();
	const history = useHistory();

	useEffect(() => {
		const getProfileData = async () => {
			try {
				const [{ data: profile }] = await Promise.all([
					axiosReq.get(`/profiles/${id}`),
				]);
				setProfileData({ results: [profile] });
				setLoaded(true);
			} catch (err) {
				if (
					err.response.status === 400 ||
					err.response.status === 404
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

		const getProfilePosts = async () => {
			try {
				const { data: profilePosts } = await axiosReq.get(
					`/posts/?owner__profile=${id}`
				);
				setProfilePosts(profilePosts.results);
				setLoaded(true);
				setFeedErrorMessage("");
			} catch (err) {
				setFeedErrorMessage(
					"Currently unable to retrieve this profiles posts, please refresh the profile, or try again soon."
				);
			}
		};

		setLoaded(false);
		getProfileData();
		getProfilePosts();
	}, [id, history, showErrorAlert]);

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

	const profileOwnedPosts = (
		<>
			{profilePosts.length ? (
				<InfiniteScroll
					dataLength={profilePosts.length}
					next={() =>
						fetchMoreData(
							profilePosts,
							setProfilePosts,
							setFeedErrorMessage
						)
					}
					hasMore={!!profilePosts.next}
					loader={<Loader loader variant="warning" />}
					endMessage={<p>No more posts to load...</p>}
				>
					{profilePosts.map((post) => (
						<Post
							key={post.id}
							{...post}
							setProfilePosts={setProfilePosts}
						/>
					))}
					{feedErrorMessage && (
						<div className="m-2">
							<p className="text-warning mb-0">
								<strong>Unexpected Feed Error:</strong>
							</p>
							<p>{feedErrorMessage}</p>
						</div>
					)}
				</InfiniteScroll>
			) : feedErrorMessage ? (
				<div className="m-2">
					<h1>Unexpected Error</h1>
					<p>{feedErrorMessage}</p>
				</div>
			) : (
				noPostsMessage
			)}
		</>
	);

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
						<ProfileCard
							{...profile.results[0]}
							setProfileData={setProfileData}
						/>
						{profileOwnedPosts}
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

export default ProfilePage;
