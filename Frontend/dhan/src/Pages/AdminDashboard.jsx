import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [documentUrl, setDocumentUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDocument, setShowDocument] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:9000/api/AdminAccount";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/gettogetapprovalbankaccount`)
      .then((response) => {
        setPendingAccounts(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch pending accounts");
      });

    axios
      .get(`${BASE_URL}/pendingdepositortransactions`)
      .then((response) => {
        setPendingTransactions(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch pending transactions");
      });
  }, []);

  const handleViewDocument = () => {
    if (!selectedAccount) return;

    setLoading(true);
    setShowDocument(false);

    axios
      .get(`${BASE_URL}/pendingaccountdocument/document/${selectedAccount._id}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const documentBlob = new Blob([response.data], { type: response.headers["content-type"] });
        const documentUrl = URL.createObjectURL(documentBlob);
        setDocumentUrl(documentUrl);
        setLoading(false);
        setShowDocument(true);
      })
      .catch((err) => {
        toast.error("Failed to fetch document");
        setLoading(false);
      });
  };

  const handleApproveAccount = () => {
    axios
      .put(`${BASE_URL}/updateaccountstatus/${selectedAccount._id}`, { status: "approved" })
      .then(() => {
        toast.success("Account approved successfully");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Failed to approve account");
      });
  };

  const handleRejectAccount = () => {
    axios
      .put(`${BASE_URL}/updateaccountstatus/${selectedAccount._id}`, { status: "rejected" })
      .then(() => {
        toast.success("Account rejected successfully");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Failed to reject account");
      });
  };

  const handleApproveTransaction = () => {
    axios
      .put(`${BASE_URL}/updateTransactionStatus/${selectedTransaction._id}`, { status: "approved" })
      .then(() => {
        toast.success("Transaction approved successfully");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Failed to approve transaction");
      });
  };

  const handleRejectTransaction = () => {
    axios
      .put(`${BASE_URL}/updateTransactionStatus/${selectedTransaction._id}`, { status: "rejected" })
      .then(() => {
        toast.success("Transaction rejected successfully");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Failed to reject transaction");
      });
  };

  const resetState = () => {
    setSelectedAccount(null);
    setSelectedTransaction(null);
    setDocumentUrl("");
    setShowDocument(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Admin Dashboard</h1>

      {/* Display Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Pending Accounts Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Pending Bank Accounts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-scroll">
          {pendingAccounts.map((account) => (
            <div
              key={account._id}
              className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setSelectedAccount(account)}
            >
              <h3 className="text-xl font-semibold text-blue-800">{account.name}</h3>
              <p className="text-gray-600">Account Type: {account.account_type}</p>
              <p className="text-gray-600">Email: {account.email}</p>
              <p className="text-gray-600">Phone: {account.phone}</p>
            </div>
          ))}
        </div>

        {/* Account Details and Approval Actions */}
        {selectedAccount && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <h3 className="text-2xl font-semibold mb-4">Account Details</h3>
            <p><strong>Name:</strong> {selectedAccount.name}</p>
            <p><strong>Email:</strong> {selectedAccount.email}</p>
            <p><strong>Phone:</strong> {selectedAccount.phone}</p>
            <p><strong>Address:</strong> {selectedAccount.address}</p>
            <p><strong>Aadhar:</strong> {selectedAccount.aadhaar}</p>

            <div className="mt-4">
              <button onClick={handleViewDocument} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">View Document</button>
              <button onClick={handleApproveAccount} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Approve</button>
              <button onClick={handleRejectAccount} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Reject</button>
            </div>
          </div>
        )}
      </div>

      {/* Pending Transactions Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Pending Depositor Transactions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-scroll">
          {pendingTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setSelectedTransaction(transaction)}
            >
              <h3 className="text-xl font-semibold text-blue-800">Check Number: {transaction.reference_id}</h3>
              <p className="text-gray-600">Date: {new Date(transaction.timestamp).toLocaleDateString()}</p>
              <p className="text-gray-600">Status: {transaction.status}</p>
            </div>
          ))}
        </div>

        {/* Transaction Details and Approval Actions */}
        {selectedTransaction && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <h3 className="text-2xl font-semibold mb-4">Transaction Details</h3>
            <p><strong>Transaction ID:</strong> {selectedTransaction.reference_id}</p>
            <p><strong>Amount:</strong> ${selectedTransaction.amount}</p>
            <p><strong>Status:</strong> {selectedTransaction.status}</p>

            <div className="mt-4">
              <button onClick={handleApproveTransaction} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Approve</button>
              <button onClick={handleRejectTransaction} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Reject</button>
            </div>
          </div>
        )}
      </div>

      {/* Show Document if available */}
      {showDocument && documentUrl && (
        <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Document Preview</h3>
          <iframe src={documentUrl} width="100%" height="500px" title="Document Preview" className="border-0" />
        </div>
      )}

      {/* Loading State */}
      {loading && <div className="mt-4 text-center">Loading document...</div>}
    </div>
  );
};

export default AdminDashboard;
