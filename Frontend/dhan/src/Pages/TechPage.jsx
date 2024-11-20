import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

// Data for the technologies
const techData = {
  mern: {
    title: "MERN Stack",
    image: "src/assets/mern.png",
    description: `
      The MERN stack is a collection of four key technologies: MongoDB, Express.js, React, and Node.js.
      Together, they provide an end-to-end framework for developers to work on both the front-end and back-end using JavaScript.
    `,
    usage: `
      **Usage in the Banking Project:**
      - **React**: Manages the user interface, enabling dynamic and interactive front-end components. The customer dashboard, transaction history, and real-time updates are powered by React.
      - **Node.js & Express**: These serve as the backbone for handling server-side logic. They manage RESTful API requests, handle transactions, and execute security protocols like authentication and data encryption.
      - **MongoDB**: This NoSQL database stores user data, including account details, transaction records, and notifications. Its flexibility allows easy scaling of the system as the user base grows.
      Together, the MERN stack allows the system to handle high loads, deliver smooth user experiences, and maintain seamless communication between the front-end and back-end.
    `,
    benefits: `
      Key Benefits:
      - Full-stack JavaScript: Developers can work on both front-end and back-end seamlessly.
      - Scalability: MongoDB ensures that data storage can scale as the application grows.
      - Performance: React's component-based architecture delivers fast and responsive interfaces.
    `,
  },
  kafka: {
    title: "Kafka/RabbitMQ",
    image: "src/assets/kafka.png",
    description: `
      Kafka and RabbitMQ are popular event-streaming platforms used for building real-time data pipelines and applications.
      They handle large-scale messaging efficiently, making them ideal for systems requiring reliable, high-throughput messaging between services.
    `,
    usage: `
      **Usage in the Banking Project:**
      - **Kafka Producer**: Every user transaction is sent to Kafka topics, ensuring efficient, asynchronous processing of payments and transfers.
      - **Kafka Consumer**: Listens to real-time transaction events, processes them, and updates the database with the latest balances. This ensures that account balances are always up to date.
      - **Audit System**: Kafka logs every transaction for compliance purposes and triggers notifications when the balance reaches critical limits or certain conditions are met.
      Kafka helps our banking platform manage real-time transactions efficiently and allows for smooth scaling as the system grows.
    `,
    benefits: `
      **Key Benefits:**
      - Event-driven architecture: Real-time processing of events, ensuring immediate feedback to users.
      - High throughput: Kafka’s distributed architecture makes it capable of handling thousands of messages per second, even during peak hours.
      - Fault tolerance: Built-in replication ensures that messages are delivered reliably.
    `,
  },
  security: {
    title: "Security & Compliance",
    image: "src/assets/security.png",
    description: `
      Security is the backbone of any banking system. It involves a set of technologies and policies that ensure the safety of users' data, compliance with regulations, and the system's protection from attacks.
    `,
    usage: `
      **Usage in the Banking Project:**
      - **JWT Authentication**: JSON Web Tokens are used to verify the identity of users during login and API requests. This ensures that only authorized users can perform transactions and access personal data.
      - **Data Encryption**: Sensitive information such as passwords and transaction details are encrypted before storage. This ensures that even in case of a data breach, user data remains safe.
      - **Audit Trails**: Every action taken within the system is logged for auditing purposes, ensuring that we comply with financial regulations and provide transparency to users.
      - **Role-Based Access Control (RBAC)**: Only users with appropriate roles (e.g., admin, teller) can access critical functionalities like approving transactions or viewing sensitive reports.
      This combination of authentication, encryption, and logging helps us build a robust security framework, ensuring users' trust in our banking system.
    `,
    benefits: `
      **Key Benefits:**
      - Data safety: Encryption ensures that even if data is compromised, it remains unreadable.
      - Regulatory compliance: Audit logs and data protection features help meet strict industry standards.
      - User trust: Users can trust that their data and transactions are secure from unauthorized access.
    `,
  },
};

// Styled component to enhance the layout and improve readability
const TechPage = () => {
  const { techId } = useParams(); // Get the tech ID from the URL
  const tech = techData[techId]; // Get the corresponding tech data
  
  if (!tech) {
    return <p>Technology not found! {techId}</p>; // Fallback in case of an invalid route
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center">
          <Card className="shadow-lg rounded-lg overflow-hidden mb-8">
            
            <Card.Body>
              <Card.Title as="h2" className="text-3xl font-semibold text-indigo-600 mb-4">{tech.title}</Card.Title>

              <Card.Text>
                <h3 className="text-2xl font-semibold mb-2">About the Technology</h3>
                <p className="text-lg text-gray-600 mb-4">{tech.description}</p>
              </Card.Text>

              <Card.Text>
                <h5 className="text-xl font-semibold mb-2">Usage in the Banking Project</h5>
                <p className="text-lg text-gray-600 mb-4">{tech.usage}</p>
              </Card.Text>

              <Card.Text>
                <h5 className="text-xl font-semibold mb-2">Key Benefits</h5>
                <p className="text-lg text-gray-600">{tech.benefits}</p>
              </Card.Text>

              <Button variant="primary" className="mt-5" href="/">
                Go Back to Home
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TechPage;
