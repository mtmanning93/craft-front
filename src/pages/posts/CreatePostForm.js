import React, { useState } from "react";
import { Form } from "react-bootstrap";
import mainStyles from "../../App.module.css";
import ActionButton from "../../components/ActionButton";

const CreatePostForm = () => {

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const { title, content, image } = postData;

  const [errors, setErrors] = useState({});

  return (
    <Form>
      <Row className={mainStyles.Content}>
        <Col>
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Example file input"
            />
            IMAGE UPLOADER
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Titlle</Form.Label>
            <Form.Control
                type="text"
                name="title"
                value={title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={content}
            />
          </Form.Group>

          <ActionButton 
            variant="warning"
            size="md"
            type="submit"
            text="Post!"
          />
        </Col>
      </Row>
    </Form>
  );
};

export default CreatePostForm;
