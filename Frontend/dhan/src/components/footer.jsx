import React from 'react';
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'; // Importing social icons from react-icons

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-6 py-4 flex flex-col items-center h-16">
        <footer className="flex flex-col md:flex-row justify-between items-center w-full">
          {/* Left Section - Company Info */}
          <div className="flex items-center space-x-2">
            <a href="/" className="text-2xl font-bold text-white hover:text-indigo-200 transition duration-300">
              Company Name
            </a>
            <span className="text-xs text-indigo-100">© 2024 Company, Inc</span>
          </div>

          {/* Social Media Icons */}
          <ul className="flex space-x-4 justify-center mt-2 md:mt-0">
            <li>
              <a
                href="https://twitter.com"
                className="text-white hover:text-blue-400 transition duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                className="text-white hover:text-pink-400 transition duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                className="text-white hover:text-blue-600 transition duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                className="text-white hover:text-blue-500 transition duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
