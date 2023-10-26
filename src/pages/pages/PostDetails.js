import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "../../components/Post";

const PostDetails = () => {
  const { id } = useParams();

  // empty array means you an fetch results or result
  const [obj, setObj] = useState({ results: [] });

  const handleMount = async () => {
    try {
      const [{data: obj}] = await Promise.all([
        axiosReq.get(`/posts/${id}`),
      ])
      setObj({results: [obj]})
      console.log(obj)
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
        <Post {...obj.results[0]} setPost={setObj} />
        <Container className="border">Comments</Container>
      </Col>
      <Col className="border d-none d-lg-block" lg={4}>
        <p>WOTW Desktop</p>
      </Col>
    </Row>
  );
};

export default PostDetails;
