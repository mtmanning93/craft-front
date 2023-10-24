import React, { useRef, useState } from "react";
import { Form, Row, Col, Container, Image, Button } from "react-bootstrap";
import mainStyles from "../../App.module.css";
import styles from "../../styles/CreatePostForm.module.css";
import ActionButton from "../../components/ActionButton";
import Loader from "../../components/Loader";
import uploadIcon from "../../assets/upload_icon.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

const CreatePostForm = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const { title, content, image } = postData;

  const [errors, setErrors] = useState({});

  const imageSelection = useRef(null);

  const history = useHistory();

  const handleImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("image", imageSelection.current.files[0]);
    formData.append("title", title);
    formData.append("content", content);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className={mainStyles.Content} md={8} lg={6}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.title?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Container
            className={`${mainStyles.Content} ${styles.UploadWrapper}`}
          >
            <Form.Group>
              {image ? (
                <>
                  <figure>
                    <Image src={image} />
                  </figure>
                  <div>
                    <Form.Label htmlFor="upload">Upload new image.</Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label htmlFor="upload">
                  <Loader
                    src={uploadIcon}
                    message="Click to upload an image."
                  />
                </Form.Label>
              )}
              <Form.File
                id="upload-image"
                accept="images/*"
                onChange={handleImage}
                ref={imageSelection}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          </Container>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={content}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.content?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <ActionButton
            variant="warning"
            size="md"
            type="submit"
            text="Post!"
          />
          <Button onClick={() => history.goBack()}>Cancel</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreatePostForm;
