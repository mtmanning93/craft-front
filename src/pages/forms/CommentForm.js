import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MainButton from "../../components/buttons/MainButton";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";

const CommentForm = (props) => {
  const { post, setPost, setComments, profile_image, profile_id } = props;

  const [commentData, setCommentData] = useState("");

  const user = useCurrentUser();

  const handleChange = (event) => {
    setCommentData(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axiosRes.post("/comments/", {
        content: commentData,
        post,
      });
  
      const data = response.data;
      // Update comments
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      // Update post, increase comments_count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setCommentData("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicPassword">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} text={user.username} />
        </Link>
        <Form.Label className="d-none">Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Join the discussion here..."
          value={commentData}
          onChange={handleChange}
        />
      </Form.Group>
      <MainButton type="submit" text="Comment" />
    </Form>
  );
};

export default CommentForm;
