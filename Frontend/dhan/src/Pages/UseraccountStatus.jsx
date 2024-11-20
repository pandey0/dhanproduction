import { useState, useEffect } from 'react';
import axios from 'axios';

const UserAccountStatus = () => {
  const [accounts, setAccount] = useState([]);

  useEffect(() => {
    // Create an async function to handle the API call
    const fetchAccountStatus = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/UserAccount/viewaccountstatus", { withCredentials: true });
        // Assuming the response returns an array of accounts in `response.data`
        setAccount(response.data || []); // Adjust based on the actual response structure
      } catch (err) {
        console.log('Error fetching account status:', err);
      }
    };

    // Call the async function
    fetchAccountStatus();
  }, []);  // Empty dependency array means this will run once on component mount

  // Handle card click (You can define what happens here)
  const handleCardClick = (account) => {
    console.log("Card clicked", account);
    // You can navigate to a detailed account view or handle any other logic
  };

  return (
    <div>
      <div>
      <h2 className="text-3xl text-red-600 font-semibold text-center mb-6">ACCOUNT STATUS</h2>

      
      </div>
      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {accounts.map((account) => (
          <div
            key={account.id} // Assuming account has an `id` field
            className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => handleCardClick(account)}
          >
            <h2 className="text-xl font-semibold">{account.name}</h2>
            <p className="text-gray-600">Account Number: {account.account_number}</p>
            <p className="text-red-600">Status: {account.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAccountStatus;
