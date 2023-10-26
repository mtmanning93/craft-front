import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "./Avatar";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const Comment = (props) => {
	const { owner, profile_id, profile_image, created_on, content } = props;

	const user = useCurrentUser();

	const is_owner = user?.username === owner;

	return (
		<Container fluid className="d-flex align-items-center border-top py-2">
			<Link to={`/profiles/${profile_id}`}>
				<Avatar src={profile_image} height={40} />
			</Link>
			<Col className="m-1 pr-0">
				<div className="d-flex justify-content-between">
					<strong>
						{owner}
						<i className="fa-regular fa-message text-muted mx-2" />
						<span className="text-muted">{created_on}</span>
					</strong>
					<div>
						{is_owner && <i className="fa-solid fa-wrench ml-2" />}
					</div>
				</div>
				<div>{content}</div>
			</Col>
		</Container>
	);
};

export default Comment;
