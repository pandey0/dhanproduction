import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TransactionHistory = () => {
  const { id } = useParams(); // Get accountNumber from URL params
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `http://localhost:9000/api/UserAccount/previoustransactions/${id}`,
          { withCredentials: true }
        );
        setTransactions(response.data.transactions);
      } catch (err) {
        setError("Error fetching transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id]); // Fetch transactions again if account number changes

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
          Transaction History for Account {id}
        </h1>

        {loading && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full border-t-4 border-blue-600 h-12 w-12"></div>
          </div>
        )}

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {transactions.length > 0 ? (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full table-auto border-separate border-spacing-0 text-sm text-gray-700">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Transaction ID</th>
                  <th className="py-2 px-4 border-b text-left">Amount</th>
                  <th className="py-2 px-4 border-b text-left">Currency</th>
                  <th className="py-2 px-4 border-b text-left">Type</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Timestamp</th>
                  <th className="py-2 px-4 border-b text-left">Reference ID</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    key={transaction._id}
                    className={`hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4 border-b">{transaction._id}</td>
                    <td className="py-3 px-4 border-b">{transaction.amount}</td>
                    <td className="py-3 px-4 border-b">{transaction.currency}</td>
                    <td className="py-3 px-4 border-b">{transaction.transaction_type}</td>
                    <td className="py-3 px-4 border-b">{transaction.status}</td>
                    <td className="py-3 px-4 border-b">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 border-b">{transaction.reference_id || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500 mt-4">
              No transactions found for this account.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
