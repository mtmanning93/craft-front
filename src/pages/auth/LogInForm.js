import React, { useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import icon from "../../assets/icon_nobg.png";
import styles from "../../styles/SignUpForm.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const LogInForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/login/", loginData);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className={`mx-auto text-center ${styles.FormWrapper}`} md={6}>
        <img src={icon} alt="site icon" />
        <h1 className={styles.Heading}>
          Welcome Back!
          <br />
          Busy Week?
        </h1>
        <p>Login here to share your craft.</p>

        <Form className="mb-2" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              placeholder="Enter Username"
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

          <Form.Group controlId="password">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          {/* make button seperate component? */}
          <Button
            className={styles.Button}
            variant="warning"
            size="md"
            type="submit"
            block
          >
            Login!
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert variant="warning" key={idx} className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
        <p>
          Dont have an account? <Link to="/signup">Sign up here.</Link>
        </p>
      </Col>
    </Row>
  );
};

export default LogInForm;
