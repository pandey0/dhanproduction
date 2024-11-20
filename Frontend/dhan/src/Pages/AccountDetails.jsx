import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const account = location.state?.account;
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const openTransactionModal = () => {
    setShowTransactionModal(true);
  };

  const closeTransactionModal = () => {
    setShowTransactionModal(false);
  };

  const handleTransactionChoice = (choice, account) => {
    setShowTransactionModal(false);
    if (choice === "deposit") {
      navigate(`/deposit/${account.account_number}`, { state: { account } });
    } else if (choice === "payment") {
      navigate(`/payment/${account.account_number}`, { state: { account } });
    }
  };

  const viewPreviousTransactions = (account) => {
    navigate(`/previoustransactions/${account.account_number}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">Account Details</h1>
        {account && (
          <div className="mb-8 space-y-4">
            <p className="text-xl font-semibold text-gray-700">Name: <span className="font-normal">{account.user_name}</span></p>
            <p className="text-xl font-semibold text-gray-700">Account Number: <span className="font-normal">{account.account_number}</span></p>
            <p className="text-xl font-semibold text-gray-700">Balance: <span className="font-normal">{account.balance}</span></p>
            <p className="text-xl font-semibold text-gray-700">Type: <span className="font-normal">{account.account_type}</span></p>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <button
            onClick={openTransactionModal}
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            Transaction
          </button>
          <button
            onClick={() => viewPreviousTransactions(account)}
            className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-green-600 transition duration-200"
          >
            Show Previous Transactions
          </button>
        </div>
      </div>

      {/* Transaction Modal */}
      {showTransactionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Transaction Type</h2>
            <button
              onClick={() => handleTransactionChoice("deposit", account)}
              className="bg-indigo-500 text-white font-semibold px-6 py-2 rounded-lg shadow mb-4 hover:bg-indigo-600 transition duration-200"
            >
              Deposit
            </button>
            <button
              onClick={() => handleTransactionChoice("payment", account)}
              className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow mb-4 hover:bg-red-600 transition duration-200"
            >
              Payment to Other Account
            </button>
            <button
              onClick={closeTransactionModal}
              className="mt-6 text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
