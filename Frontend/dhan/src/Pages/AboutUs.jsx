import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-8">
      {/* Banner Image */}
      <div className="w-full mb-8">
        <img
          src="src/assets/DHANBANNER.png"
          className="object-cover h-64 w-full rounded-lg shadow-lg"
          alt="About Us Banner"
        />
      </div>

      {/* About Us Section */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg">
          Welcome to Dhan Bank! We're here to empower your financial journey with secure, innovative, and real-time banking solutions.
        </p>
      </section>

      {/* Vision Section */}
      <section className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Our Vision</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At Dhan, we envision a world where financial transactions are seamless, secure, and designed to elevate the customer experience.
          By bridging traditional banking with modern digital transformation, we create solutions that support both today’s needs and tomorrow’s growth.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Dhan's mission is to make every transaction faster, safer, and more transparent. From personal transfers to high-volume corporate transactions, 
          we are dedicated to providing a robust platform that promotes financial inclusivity, efficiency, and customer satisfaction.
        </p>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">What Sets Us Apart</h2>
        <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
          <li>
            <span className="font-semibold text-gray-800">Cutting-Edge Technology:</span> With a real-time processing engine and advanced cloud infrastructure, our platform is built to handle high transaction volumes without compromising security.
          </li>
          <li>
            <span className="font-semibold text-gray-800">Security & Compliance:</span> We adhere to strict global standards in data protection and regulatory compliance, ensuring that your financial information remains secure at every step.
          </li>
          <li>
            <span className="font-semibold text-gray-800">User-Centric Design:</span> Our intuitive user interface and responsive support are designed with you in mind, allowing easy access and management of finances wherever you go.
          </li>
          <li>
            <span className="font-semibold text-gray-800">Scalability & Reliability:</span> Dhan Bank's platform scales with your needs, providing reliable and consistent service regardless of how your requirements evolve.
          </li>
        </ul>
      </section>

      {/* Team Section */}
      <section className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Our Team</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Our team of finance, technology, and customer experience experts is constantly innovating to keep customer satisfaction and trust at the heart of Dhan's operations. 
          Behind every transaction, there’s a story, and we’re committed to making each one secure, seamless, and efficient.
        </p>
      </section>

      {/* Join Us Section */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Join Us on Our Journey</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Whether you're a first-time customer or a long-standing client, Dhan Bank invites you to experience modern, efficient, and customer-focused banking. 
          Discover how our commitment to excellence can transform your financial interactions, now and in the future.
        </p>

        {/* Create Account Button */}
        <div className="mt-5">
          <Link to="/login?tab=register">
            <Button variant="primary" size="lg" className="mt-3 px-6 py-3 rounded-md">
              Create an Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
