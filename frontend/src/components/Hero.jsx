import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "./Header";

const Hero = () => {
  return (
    <>
      <Header transparent={true} />
      <div
        className="hero-section"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-3 text-white fw-bold mb-4">
                Manage Your Tasks Efficiently
              </h1>
              <p className="lead text-white mb-4">
                Stay organized and boost your productivity with our intuitive
                task management system. Create, track, and complete tasks with
                ease.
              </p>
              <Button variant="light" size="lg" className="px-4" href="/login">
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Hero;
