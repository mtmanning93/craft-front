import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../api/axiosDefaults";
import Post from "../components/Post";
import CommentForm from "./forms/CommentForm";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const PostDetails = () => {
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  // empty array means you an fetch results or result
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });

  const handleMount = async () => {
    try {
      const [{ data: post }, { data: comments }] = await Promise.all([
        axiosReq.get(`/posts/${id}`),
        axiosReq.get(`/comments/?post=${id}`),
      ]);
      setPost({ results: [post] });
      setComments(comments);
      console.log(post);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, [id]);

  return (
    <Row className="w-100 border p-2">
      <Col className="border" lg={8}>
        <p>WOTW Mobile</p>
        <Post {...post.results[0]} setPosts={setPost} />
        <Container className="border">
          {currentUser ? (
            <CommentForm
              profile_id={currentUser.profile_id}
              profile_image={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          
          {comments.results.length ? (
            comments.results.map(comment => (
              <p key={comment.id}>
                {comment.owner}: {comment.content}
              </p>
            ))
          ) : currentUser ? (
            <span>be the first</span>
          ) : (
            <span>no comments yet</span>
          )}
        </Container>
      </Col>
      <Col className="border d-none d-lg-block" lg={4}>
        <p>WOTW Desktop</p>
      </Col>
    </Row>
  );
};

export default PostDetails;
