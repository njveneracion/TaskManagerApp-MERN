import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      navigate("/");
    } catch (error) {
      setError("Failed to register");
    }
  };

  return (
    <Container className="card p-3 mt-5 " style={{ maxWidth: "400px" }}>
      <Row>
        <Col>
          <h2 className="fw-bold mb-3">Register</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg. Juan Dela Cruz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="yourname@domain"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Alert variant="warning">
              Password must be at least 6 characters long and contain at least
              one number and one letter, to prevent weak passwords.
            </Alert>

            <Button variant="dark" type="submit" className="w-100">
              Register
            </Button>
            <p className="text-center">
              Don't have an account? <Link to="/login">Sign in</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
