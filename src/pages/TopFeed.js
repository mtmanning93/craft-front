import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../api/axiosDefaults";
import Loader from "../components/tools/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchMoreData from "../components/tools/InfiniteScroll";
import WorkOfTheWeek from "../components/WorkOfTheWeek";
import stylesW from "../styles/WotW.module.css";
import styles from "../styles/TopFeed.module.css";
import mainStyles from "../App.module.css";
import ApprovalFeedCard from "../components/ApprovalFeedCard";
import { useRedirectUser } from "../hooks/useRedirectUser";

const Feed = () => {
	useRedirectUser("loggedOut");

	const [profiles, setProfiles] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [search, setSearch] = useState("");
	const [feedErrorMessage, setFeedErrorMessage] = useState("");
	const [noResultsMessage, setNoResultsMessage] = useState("");

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
				setFeedErrorMessage("");

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
			getApprovedFeed();
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [search]);

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
				<div className="d-flex flex-column flex-sm-row mt-3">
					<div className="d-sm-none">
						<strong>
							<i className="fa-solid fa-circle-info mr-1" />
							Filter approved profiles
						</strong>
						<p>
							Try searching by trade, job title or location, to
							filter all profiles and find the most approved
							tradesmen and women in your search.
						</p>
					</div>
					<Col sm={11} className="p-0">
						<Form
							onSubmit={(event) => event.preventDefault()}
							className={`${mainStyles.Content} d-flex pl-0`}
						>
							<i className="fa-solid fa-magnifying-glass my-auto mx-2" />

							<Form.Control
								type="text"
								placeholder="Search approvals list..."
								value={search}
								onChange={(event) =>
									setSearch(event.target.value)
								}
							></Form.Control>
						</Form>
					</Col>
					<Col
						sm={1}
						className={`${styles.Info} d-none p-0 d-sm-flex align-items-center justify-content-end justify-content-lg-center`}
					>
						<OverlayTrigger
							placement="bottom"
							overlay={
								<Popover id="popover-positioned-bottom">
									<Popover.Title as="h3">
										Filter approved profiles
									</Popover.Title>
									<Popover.Content>
										Try searching by trade, job title or
										location, to filter all profiles and
										find the most approved tradesmen and
										women in your search.
									</Popover.Content>
								</Popover>
							}
						>
							<i className="fa-solid fa-circle-info" />
						</OverlayTrigger>
					</Col>
				</div>

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
						{profiles.results.length ? (
							<InfiniteScroll
								dataLength={profiles.results.length}
								next={() =>
									fetchMoreData(
										profiles,
										setProfiles,
										setFeedErrorMessage
									)
								}
								hasMore={!!profiles.next}
								loader={<Loader loader variant="warning" />}
								endMessage={<p>No more profiles to load...</p>}
							>
								{profiles.results.map((profile, idx) => (
									<ApprovalFeedCard
										key={profile.id}
										profile={profile}
										ranking={idx + 1}
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

export default Feed;
