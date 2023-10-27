import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../api/axiosDefaults";
import Loader from "../components/Loader";
import Post from "../components/Post";

const Feed = ({ filter = "" }) => {
	const [posts, setPosts] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const currentUrl = useLocation().pathname;

	const user = useCurrentUser();
	const user_id = user?.profile_id;

	useEffect(() => {
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
	}, [filter, currentUrl]);

	return (
		<Row className="w-100 p-2">
			<Col className="p-0">
				<p className="border m-2 d-lg-none">WOTW Mobile</p>

				{loaded ? (
					<>
						{posts.results.length
							? posts.results.map((post) => (
									<Post
										key={post.id}
										{...post}
										setPosts={setPosts}
									/>
							  ))
							: console.log("Show no results thing here")}
					</>
				) : (
					<Loader loader />
				)}
			</Col>
			<Col className="border ml-2 d-none d-lg-block" lg={4}>
				<p>WOTW Desktop</p>
			</Col>
		</Row>
	);
};

export default Feed;
