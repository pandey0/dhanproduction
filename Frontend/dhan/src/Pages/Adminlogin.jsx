import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const adminlogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the 'tab' query parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') || 'adminlogin';

  // Initialize state based on the defaultTab value
  const [isadminlogin, setIsadminlogin] = useState(defaultTab === 'adminlogin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');  // State for notification message

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/api/Adminauth/signup", { email, password, name });
      if (response.status === 200) {
        // Show success notification
        setNotification("Registration successful! You can now log in.");
        setTimeout(() => setNotification(''), 5000);  // Hide notification after 5 seconds
        
      }
    } catch (error) {
      setError(error.response.data.message);
      setNotification('Registration failed. Please try again.');  // Set error notification
      setTimeout(() => setNotification(''), 5000);  // Hide notification after 5 seconds
    }
  };

  const handleadminlogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/api/Adminauth/signin", { email, password }, { withCredentials: true });
      if (response.status === 200) {
        navigate('/admindashboard', { replace: true });
      }
    } catch (error) {
      setError(error.response.data.message);
      setNotification("adminlogin failed. Please check your credentials.");
      setTimeout(() => setNotification(''), 5000);  // Hide notification after 5 seconds
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        {/* Tabs navigation */}
        <ul className="flex justify-center mb-6 space-x-4 border-b-2">
          <li className="flex-1">
            <button
              onClick={() => setIsadminlogin(true)}
              className={`w-full py-3 text-lg font-semibold text-center ${isadminlogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              adminlogin
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => setIsadminlogin(false)}
              className={`w-full py-3 text-lg font-semibold text-center ${!isadminlogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Register
            </button>
          </li>
        </ul>

        {/* Notification (Custom Message) */}
        {notification && (
          <div className="mb-4 p-3 text-white bg-blue-600 rounded">
            {notification}
          </div>
        )}

        {/* Form content */}
        <div className="mt-4">
          {isadminlogin ? (
            // adminlogin Form
            <form onSubmit={handleadminlogin} className="space-y-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {/* Email input */}
              <div>
                <input
                  type="email"
                  id="adminloginEmail"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password input */}
              <div>
                <input
                  type="password"
                  id="adminloginPassword"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Remember me and Forgot password */}
              <div className="flex justify-between items-center">
                <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <a href="#!" className="text-sm text-blue-600">Forgot password?</a>
              </div>

              {/* Submit button */}
              <div>
                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            // Register Form
            <form onSubmit={handleRegister} className="space-y-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {/* Name input */}
              <div>
                <input
                  type="text"
                  id="registerName"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email input */}
              <div>
                <input
                  type="email"
                  id="registerEmail"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password input */}
              <div>
                <input
                  type="password"
                  id="registerPassword"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

             

              

              {/* Submit button */}
              <div>
                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default adminlogin;
