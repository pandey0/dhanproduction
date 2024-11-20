import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SuccessfulTransaction = () => {
  const { id } = useParams(); // Get the `id` from the URL
  const [transactionDetail, setTransactionDetail] = useState(null); // State to store transaction details
  const [error, setError] = useState(''); // State to store any errors

  // Fetch transaction details using useEffect
  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        const response = await axios.get(`https://localhost:9000/api/Useraccount/transactionscompletion/${id}`, { withCredentials: true });
        setTransactionDetail(response.data); // Set the response data to the state
      } catch (error) {
        setError('Failed to fetch transaction details.');
        console.error(error); // Log the error for debugging
      }
    };

    fetchTransactionDetail(); // Call the async function to fetch the data
  }, [id]); // Dependency array ensures the effect runs when `id` changes

  // Render loading, error, or the transaction details
  if (!transactionDetail && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2>Transaction Details</h2>
      {/* Display transaction details if they are available */}
      <div>
        <p><strong>Transaction ID:</strong> {transactionDetail._id}</p>
        <p><strong>Amount:</strong> {transactionDetail.amount}</p>
        <p><strong>Status:</strong> {transactionDetail.status}</p>
        {/* Add more fields as needed based on your API response */}
      </div>
    </div>
  );
};

export default SuccessfulTransaction;
