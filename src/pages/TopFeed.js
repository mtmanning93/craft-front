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
import CompanyList from "../components/CompanyList";

/**
 * A feed component for displaying all site profiles.
 * Users can filter results via asearch input form,
 * posts are listed from most approved to least.
 */
const Feed = () => {
	useRedirectUser("loggedOut");

	const [profiles, setProfiles] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [search, setSearch] = useState("");
	const [feedErrorMessage, setFeedErrorMessage] = useState("");
	const [noResultsMessage, setNoResultsMessage] = useState("");
    
    // Message for if there are no posts to display.
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
    
    // Fetches all profiles for approved feed, and filters them when user gives search input.
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

        // sets loaded to false for 1 second, for use when the user types in the search input.
        // prevents multiple rendering.
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
                {/* Small screens Work of the Week component. */}
				<div
					className="m-0 mt-3 d-md-none"
				>
					<CompanyList />
				</div>
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
                        {/* form to filter top feed results via search input */}
						<Form
							onSubmit={(event) => event.preventDefault()}
							className={`${mainStyles.Content} d-flex pl-0`}
						>
							<Form.Label
								htmlFor="search-input-top"
								className="sr-only"
							>
								Search Feed
							</Form.Label>
							<i className="fa-solid fa-magnifying-glass my-auto mx-2" />
							<Form.Control
								id="search-input-top"
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
						{profiles.results.length ? (
                            // Infinite scroll component fetches more feed data when necessary
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
								endMessage={
									<strong>No more profiles to load...</strong>
								}
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
            {/* Large screens work of the week component */}
			<Col md={4} className="d-none d-md-block">
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

export default Feed;
