import React, { useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import icon from "../../assets/icon_nobg.png";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="m-auto text-center" md={6}>
        <img src={icon} alt="site icon" />
        <h1>
          Love your craft?
          <br />
          Share your craft!
        </h1>
        <p>Sign up here to join the craft social network.</p>

        <Form onSubmit={handleSubmit} className="mb-2">
          <h2>Enter Details</h2>
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.username?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password1">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password1"
              value={password1}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password1?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password2">
            <Form.Label className="d-none">Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password2?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* make button seperate component? */}
          <Button variant="warning" size="md" type="submit" block>
            Sign Up!
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

        </Form>
        <p>
          Already have an account? <Link to="/login">Login here.</Link>
        </p>
      </Col>
    </Row>
  );
};

export default SignUpForm;
