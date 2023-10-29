import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import Loader from "./tools/Loader";
import styles from "../styles/WotW.module.css";
import mainStyles from "../App.module.css";

const WorkOfTheWeek = () => {
	const [postData, setPostData] = useState({
		popularPosts: { results: [] },
	});

	const { popularPosts } = postData;

	useEffect(() => {
		const handleMount = async () => {
			try {
				const { data } = await axiosReq.get(
					"/posts/?ordering=-likes_count"
				);
				setPostData((prevState) => ({
					...prevState,
					popularPosts: data,
				}));
			} catch (error) {
				console.log(error);
			}
		};
		handleMount();
	}, []);

	return (
		<>
			<Row className="m-0 justify-content-around flex-lg-column w-100 h-100 p-2 row">
				{popularPosts.results.length ? (
					popularPosts.results.slice(0, 3).map((post) => (
						<Col
							className={`${styles.Post} ${mainStyles.Content} mx-2 mx-lg-0 my-lg-2`}
							key={post.id}
						>
							{post.title}
						</Col>
					))
				) : (
					<Loader loader />
				)}
			</Row>
		</>
	);
};

export default WorkOfTheWeek;
