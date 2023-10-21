import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import icon from "../../assets/icon_nobg.png";

const SignUpForm = () => {
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
        <Form className="mb-2">
          <Form.Label>Enter Details</Form.Label>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter a username"
              name="username"
            />
          </Form.Group>
          <Form.Group controlId="formPassword1">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password1"
            />
          </Form.Group>
          <Form.Group controlId="formPassword2">
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="password2"
            />
          </Form.Group>

          <Button variant="warning" size="md" type="submit" block>
            Sign Up!
          </Button>
        </Form>
        <p>
          Already have an account? <Link to="/login">Login here.</Link>
        </p>
      </Col>
    </Row>
  );
};

export default SignUpForm;
