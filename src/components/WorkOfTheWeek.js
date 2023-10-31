import React, { useEffect, useState } from "react";
import { Row, Card } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import Loader from "./tools/Loader";
import styles from "../styles/WotW.module.css";
import mainStyles from "../App.module.css";
import Avatar from "./Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
			<Row className={`${styles.Wrapper} m-0 justify-content-around flex-md-column w-100 h-100 p-2 pt-md-0`}>
				{popularPosts.results.length ? (
					popularPosts.results.slice(0, 3).map((post) => (
						<Card
							style={{
								backgroundImage: `url(${post.image})`,
							}}
							className={`${styles.Post} ${mainStyles.Content} my-md-2`}
                            key={post.id}
						>
							<Link className="h-100" to={`/posts/${post.id}`}>
								<div className="d-flex flex-column h-100">
									<Card.Header
										className={`${styles.Header} p-1 p-md-2`}
									>
										<Avatar
											src={post.profile_image}
											height={45}
											textAfter={post.owner}
											className={styles.Avatar}
										/>
									</Card.Header>
									<Card.Body
										className={`${styles.Title} flex-grow-1`}
									>
										<p>{post.title}</p>
									</Card.Body>
									<Card.Footer
										className={`${styles.Footer} d-flex justify-content-between p-2`}
									>
										<div>
											{post.comments_count}
											<i className="fa-solid fa-message fa-sm ml-1"></i>
										</div>
										<div>
											{post.likes_count}
											<i className="fa-solid fa-thumbs-up ml-1"></i>
										</div>
									</Card.Footer>
								</div>
							</Link>
						</Card>
					))
				) : (
					<Loader loader variant="dark" />
				)}
			</Row>
		</>
	);
};

export default WorkOfTheWeek;
