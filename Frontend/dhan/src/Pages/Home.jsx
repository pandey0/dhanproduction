import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // for logo animation

const HomePage = () => {
  return (
    <Container className="text-center mt-5 px-4 md:px-0">
      {/* Bank logo with smooth animation */}
      <div className="mb-10 flex flex-col items-center">
        <motion.img
          src="src/assets/banklogo.jpg"
          alt="Bank Logo"
          className="w-36 mb-4 rounded-full shadow-lg"
          animate={{ rotateY: 360 }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
        />
        <h1 className="text-4xl font-semibold text-indigo-600">Welcome to Our Bank</h1>
      </div>

      <h1 className="text-3xl font-semibold text-gray-800">Welcome to the Future of Banking</h1>
      <p className="mb-6 text-gray-600 text-lg">
        Experience secure, scalable, and reliable transaction processing in real-time.
      </p>

      {/* Technology Cards */}
      <Row className="justify-center">
        <Col md={4} className="mb-6">
          <Link to="/tech/mern" className="text-decoration-none">
            <Card className="tech-card shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all">
              <Card.Img variant="top" src="src/assets/mern.png" alt="MERN Stack" />
              <Card.Body className="bg-white text-center py-6 px-4">
                <Card.Title className="text-lg font-semibold text-gray-800">MERN Stack</Card.Title>
                <Card.Text className="text-gray-500">
                  Technologies: React, Node.js, Express, MongoDB
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={4} className="mb-6">
          <Link to="/tech/kafka" className="text-decoration-none">
            <Card className="tech-card shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all">
              <Card.Img variant="top" src="src/assets/kafka.png" alt="Kafka" />
              <Card.Body className="bg-white text-center py-6 px-4">
                <Card.Title className="text-lg font-semibold text-gray-800">Kafka/RabbitMQ</Card.Title>
                <Card.Text className="text-gray-500">
                  Real-time Transaction Processing with Scalable Messaging.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={4} className="mb-6">
          <Link to="/tech/security" className="text-decoration-none">
            <Card className="tech-card shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all">
              <Card.Img variant="top" src="src/assets/security.png" alt="Security" style={{ height: '400px', objectFit: 'cover' }} />
              <Card.Body className="bg-white text-center py-6 px-4">
                <Card.Title className="text-lg font-semibold text-gray-800">Security & Compliance</Card.Title>
                <Card.Text className="text-gray-500">
                  Ensuring Data Integrity & Meeting Regulatory Standards.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>

      {/* Call to action: Join the Bank */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Join Us and Embrace Seamless Banking</h2>
        <p className="mb-4 text-lg text-gray-600">
          Open an account today and enjoy the benefits of secure, real-time transactions.
        </p>
        <Link to="/login?tab=register">
          <Button variant="primary" size="lg" className="mt-3 px-8 py-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none transition-all">
            Create an Account
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default HomePage;
