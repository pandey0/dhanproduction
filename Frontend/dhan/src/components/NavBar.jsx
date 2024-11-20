import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        {/* Navbar Brand */}
        <a
          className="text-2xl font-bold text-white hover:text-indigo-200 transition duration-300 transform hover:scale-110"
          href="/"
        >
          DHAN
        </a>

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

        {/* Navbar Links */}
        <div
          id="navbar-menu"
          className="hidden lg:flex lg:items-center lg:space-x-8 transition-all duration-300 ease-in-out"
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6">
            <li>
              <a
                className="text-white text-lg hover:text-indigo-200 transition duration-300"
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-white text-lg hover:text-indigo-200 transition duration-300"
                href="/AboutUs"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="hidden lg:flex space-x-4">
          <a
            className="px-6 py-2 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300"
            href="/Login"
          >
            Login/Signup
          </a>
          <a
            className="px-6 py-2 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-300"
            href="/admin"
          >
            Admin
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
