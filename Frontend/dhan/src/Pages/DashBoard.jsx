import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/UserAccount/myaccounts", {
          withCredentials: true,
        });

        setLoggedInUser(response.data.user);
        setAccounts(response.data.accounts);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleCardClick = (account) => {
    navigate(`/account/${account.account_number}`, { state: { account } });
  };

  const createNewAccount = () => {
    navigate("/CreateAccount");
  };

  const viewAccountStatus = () => {
    navigate("/useraccountstatus");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Welcome to Your Dashboard</h1>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : (
        <>
          {/* Account Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <div
                  key={account.id}
                  className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-all duration-300"
                  onClick={() => handleCardClick(account)}
                >
                  <h2 className="text-xl font-semibold text-indigo-700">{account.name}</h2>
                  <p className="text-gray-600">Account Number: {account.account_number}</p>
                  <p className="text-gray-600">Balance: ${account.balance}</p>
                  <p className="text-gray-600">Type: {account.account_type}</p>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-xl text-gray-500">No accounts found.</div>
            )}
          </div>

          {/* Create New Account & View Account Status Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={createNewAccount}
              className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-200"
            >
              Create New Account
            </button>
            <button
              onClick={viewAccountStatus}
              className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-200"
            >
              View Account Status
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
