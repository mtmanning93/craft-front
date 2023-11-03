import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
// import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../api/axiosDefaults";
import Loader from "../components/tools/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchMoreData from "../components/tools/InfiniteScroll";
import WorkOfTheWeek from "../components/WorkOfTheWeek";
import stylesW from "../styles/WotW.module.css";
import mainStyles from "../App.module.css";
import ApprovalFeedCard from "../components/ApprovalFeedCard";
import { useRedirectUser } from "../hooks/useRedirectUser";

const Feed = () => {
    useRedirectUser('loggedOut');

	const [profiles, setProfiles] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [search, setSearch] = useState("");

	// const user = useCurrentUser();
	// const user_id = user?.profile_id;

	// // console.log("User:", user);
	// // console.log("UserID:", user_id);
	// // May need to be called inside the App.js file see Bug Reports

	const noFeedMessage = (
		<div>
			<h1>No profiles yet! You have not liked any profiles.</h1>
			<p>
				You must like others profiles to show all your liked profiles
				here.{" "}
				<Link className="text-warning" to="/">
					Get started here.
				</Link>
			</p>
		</div>
	);

	useEffect(() => {
		const getApprovedFeed = async () => {
			try {
				const { data } = await axiosReq.get(
					`/profiles/?ordering=-approval_count&search=${search}`
				);
				setProfiles(data);
				setLoaded(true);
			} catch (error) {
				console.log(error);
			}
		};

		setLoaded(false);
			const timeout = setTimeout(() => {
				getApprovedFeed();
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
                <Form
					onSubmit={(event) => event.preventDefault()}
					className={`${mainStyles.Content} mt-3 d-flex`}
				>
					<i className="fa-solid fa-magnifying-glass my-auto mx-2" />

					<Form.Control
						type="text"
						placeholder="Search approvals list..."
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					></Form.Control>
				</Form>

				{loaded ? (
					<>
						{profiles.results.length ? (
							<InfiniteScroll
								dataLength={profiles.results.length}
								next={() =>
									fetchMoreData(profiles, setProfiles)
								}
								hasMore={!!profiles.next}
								loader={<Loader loader variant="warning" />}
								endMessage={<p>No more profiles to load...</p>}
							>
								{profiles.results.map((profile, idx) => (
									<ApprovalFeedCard key={profile.id} profile={profile} ranking={idx + 1} />
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

export default Feed;
