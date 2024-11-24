import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "./Header";
import { motion } from "framer-motion";
import Footer from "./Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            <Row className="justify-content-center text-center">
              <Col md={8}>
                <motion.h1
                  variants={itemVariants}
                  className="display-3 text-white fw-bold mb-4">
                  Manage Your Tasks Efficiently
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="lead text-white mb-4">
                  Stay organized and boost your productivity with our intuitive
                  task management system. Create, track, and complete tasks with
                  ease.
                </motion.p>
                <motion.div variants={itemVariants}>
                  <Button
                    variant="light"
                    size="lg"
                    className="px-4"
                    href="/login">
                    Get Started
                  </Button>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Hero;
