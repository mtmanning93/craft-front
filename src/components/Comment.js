import React from "react";
import { Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "./Avatar";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import SettingsDropdown from "./buttons/SettingsDropdown";
import { axiosRes } from "../api/axiosDefaults";

const Comment = (props) => {
	const {
		owner,
		profile_id,
		profile_image,
		created_on,
		content,
		id,
		setPost,
		setComments,
	} = props;

	const user = useCurrentUser();

	const is_owner = user?.username === owner;
    
    const deleteComment = async () => {
        try {
          await axiosRes.delete(`/comments/${id}`);
      
          setPost((prevPost) => ({
            results: [
              {
                ...prevPost.results[0],
                comments_count: prevPost.results[0].comments_count - 1,
              },
            ],
          }));
      
          setComments((prevComments) => ({
            results: prevComments.results.filter((comment) => comment.id !== id),
          }));
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      };

	return (
		<Container fluid className="d-flex align-items-center border-top py-2">
			<Link to={`/profiles/${profile_id}`}>
				<Avatar src={profile_image} height={40} />
			</Link>
			<Col className="m-1 p-0">
				<div className="d-flex justify-content-between">
					<strong>
						{owner}
						<i className="fa-regular fa-message text-muted mx-2" />
						<span className="text-muted">{created_on}</span>
					</strong>
					<div>
						{is_owner && (
							<SettingsDropdown
								editObject={() => {}}
								deleteObject={deleteComment}
							/>
						)}
					</div>
				</div>
				<div>{content}</div>
			</Col>
		</Container>
	);
};

export default Comment;
