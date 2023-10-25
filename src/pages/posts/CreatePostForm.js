import React, { useRef, useState } from "react";
import { Form, Row, Col, Image, Alert } from "react-bootstrap";
import mainStyles from "../../App.module.css";
import styles from "../../styles/CreatePostForm.module.css";
import ActionButton from "../../components/ActionButton";
import Loader from "../../components/Loader";
import uploadIcon from "../../assets/upload_icon.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import BackButton from "../../components/BackButton";

const CreatePostForm = () => {
  const currentUser = useCurrentUser();

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
      <Col sm={12} md={10} lg={8} className="p-0">
        <Form
          onSubmit={handleSubmit}
          className={`${styles.Form} ${mainStyles.Content} border m-3 pt-2 pb-2`}
        >
          <Row className="m-2 pb-2 border-bottom">
            <Col xs={{ span: 6, order: 1 }} md={{ span: 4, order: 1 }}>
              <Avatar
                src={currentUser?.profile_image}
                height={40}
                text={currentUser?.username}
              />
            </Col>
            <Col
              className="text-center pt-2 pt-md-0"
              xs={{ span: 12, order: 3 }}
              md={{ span: 4, order: 2 }}
            >
              <h1 className="mt-2">Create a post</h1>
            </Col>
            <Col
              className="text-right"
              xs={{ span: 6, order: 2 }}
              md={{ span: 4, order: 3 }}
            >
              <BackButton />
            </Col>
          </Row>

          <Row
            id="inputs"
            className={`${styles.FormWrap} ${mainStyles.Content} border m-2 p-2 p-md-0 flex-column flex-md-row`}
          >
            <Col className="m-md-2 p-0">
              <Form.Group>
                <Form.Label className="d-none">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Title..."
                  value={title}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Group>
                <Form.Label className="d-none">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="content"
                  placeholder="Share more details..."
                  value={content}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Col>

            <Col
              className={`${styles.ImgContainer} ${mainStyles.Content} border m-md-2 p-0 pt-2`}
            >
              <Form.Group className="m-0">
                {image ? (
                  <>
                    <figure>
                      <Image className={styles.Image} src={image} />
                    </figure>
                    <div className={`${styles.ChangeImgBtn} p-0 mb-2`}>
                      <Form.Label className="btn" htmlFor="upload">
                        <i class="fa-solid fa-images mr-2"></i>Click to change
                        image.
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label className="btn" htmlFor="upload">
                    <Loader
                      src={uploadIcon}
                      message="Click here to upload an image."
                    />
                  </Form.Label>
                )}

                <Form.File
                  id="upload"
                  accept="image/*"
                  onChange={handleImage}
                  ref={imageSelection}
                  hidden
                />
              </Form.Group>
              {errors.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Col>
          </Row>
          <Row className="m-2">
            <ActionButton
              variant="warning"
              size="md"
              type="submit"
              text="Post!"
              block
            />
          </Row>
        </Form>
      </Col>
  );
};

export default CreatePostForm;
