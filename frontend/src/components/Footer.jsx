import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="mb-3">
          <Col lg={12} className="text-center">
            <a
              href="https://www.facebook.com/njveneracionn"
              className="text-light mx-2">
              <FaFacebook size={24} />
            </a>
            <a href="https://x.com/aamryme" className="text-light mx-2">
              <FaTwitter size={24} />
            </a>
            <a
              href="https://github.com/njveneracion"
              className="text-light mx-2">
              <FaGithub size={24} />
            </a>
            <a
              href="www.linkedin.com/in/nelsonjayveneracion"
              className="text-light mx-2">
              <FaLinkedin size={24} />
            </a>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <p className="text-center mb-0">
              &copy; 2024 Task Manager / Dev Diary. All Rights Reserved.
              <br />
              <span className="text-warning">Nelson Jay Veneracion</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
