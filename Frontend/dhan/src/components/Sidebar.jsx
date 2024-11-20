import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-800 text-white min-h-screen p-6 shadow-lg">
      {/* Sidebar Title */}
      <h2 className="text-3xl font-semibold mb-8 text-center">
        DHAN
      </h2>

      {/* Navigation Links */}
      <nav>
        <ul>
          <li className="mb-6">
            <Link
              to="/userdashboard"
              className="text-lg hover:text-blue-300 transition-colors duration-200 transform hover:scale-105"
            >
              Home
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/profile"
              className="text-lg hover:text-blue-300 transition-colors duration-200 transform hover:scale-105"
            >
              Profile
            </Link>
          </li>
          <li className="mb-6">
            <Link
              to="/notifications"
              className="text-lg hover:text-blue-300 transition-colors duration-200 transform hover:scale-105"
            >
              Notifications
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer/Additional Links (Optional) */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 Dhan Bank. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
