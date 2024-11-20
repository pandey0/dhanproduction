import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const logout = await axios.get("http://localhost:9000/api/userauth/signout");
      if (logout.status === 200) {
        // Clear local storage or session storage if you are using it for authentication
        localStorage.removeItem('token'); // Optional: if you're storing token in localStorage
        navigate("/", { replace: true }); // Redirect to the homepage or login page
      }
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        {/* Inline Style for Keyframes Animation */}
        <style>
          {`
            @keyframes marquee {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
          `}
        </style>

        {/* Navbar Brand with Moving Text */}
        <span
          className="text-2xl font-bold text-white w-full whitespace-nowrap"
          style={{
            display: 'inline-block',
            animation: 'marquee 10s linear infinite',
          }}
        >
          DHAN AAP KE FINANCIAL JOURNEY KA SATHI
        </span>

        {/* Navbar Toggler for Mobile */}
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
            onClick={() => {
              const menu = document.getElementById("navbar-menu");
              menu.classList.toggle("hidden");
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Logout Button */}
        <button
          className="hidden lg:block px-6 py-2 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
