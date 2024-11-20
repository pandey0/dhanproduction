import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router

const EditProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();  // Hook to navigate programmatically

  useEffect(() => {
    // Fetch user profile to populate the form
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/UserAccount/profile', { withCredentials: true });
        setUser(response.data.details);  // Assuming the response contains the profile details
        setLoading(false);
      } catch (err) {
        setError('Could not fetch profile. Please log in again.');
        setLoading(false);
        navigate('/login');  // Navigate to the login page if there is an error fetching the profile
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send updated user data in the PUT request
      const response = await axios.put('http://localhost:9000/api/UserAccount/editprofile', user, {
        withCredentials: true  // Ensures that cookies/session are sent with the request
      });
      setIsUpdated(true);
      setError(null);
      alert('Profile updated successfully!');
      
      // Navigate to /profile after successful update
      navigate('/profile');
    } catch (err) {
      console.error(err);  // Log error for debugging
      setError('Error updating profile. Please try again.');
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <div className="text-center text-lg text-indigo-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-gray-700 font-medium">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.username}  // Corrected to `user.name`
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            disabled
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="block text-gray-700 font-medium">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="block text-gray-700 font-medium">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={user.address}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-6 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          Update Profile
        </button>
      </form>

      {isUpdated && <div className="text-center text-green-500 mt-4">Profile updated successfully!</div>}
    </div>
  );
};

export default EditProfile;
