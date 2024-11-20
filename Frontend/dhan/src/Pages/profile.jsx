import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use useNavigate hook for navigation
  const navigate = useNavigate();

  const onClickEditProfile = () => {
    navigate('/editprofile');
  }

  useEffect(() => {
    // Fetch user profile data on component mount
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/UserAccount/profile', { withCredentials: true });
        setUser(response.data.details);
      } catch (err) {
        setError('Could not fetch profile. Please log in again.');
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div className="text-center text-lg text-indigo-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center text-red-500">User profile not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">User Profile</h1>
      
      <div className="space-y-4">
        <div>
          <p><strong className="font-medium text-gray-700">Name:</strong> {user.username}</p>
        </div>
        <div>
          <p><strong className="font-medium text-gray-700">Email:</strong> {user.email}</p>
        </div>
        <div>
          <p><strong className="font-medium text-gray-700">Phone:</strong> {user.phone}</p>
        </div>
        <div>
          <p><strong className="font-medium text-gray-700">Address:</strong> {user.address}</p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-md shadow hover:bg-blue-600 transition duration-200" onClick={onClickEditProfile}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
