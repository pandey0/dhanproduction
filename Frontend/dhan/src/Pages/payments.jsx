import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentForm = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get account number from URL params
  console.log(id)
  
  const [transferType, setTransferType] = useState('Wire');
  const [toid, setToid] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState(null); // State to hold the sender's account details
  const [recipientAccount, setRecipientAccount] = useState(null); // State to hold recipient account details
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch sender's account details based on the account number from URL
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:9000/api/UserAccount/getaccount/${id}`,{withCredentials:true})
        .then((response) => {
          console.log("this is the responce:",response.data.accounts[0])
          setAccount(response.data.accounts[0]); // Set sender's account data
        })
        .catch((error) => {
          setErrorMessage('Failed to fetch sender account details.');
        });
    }
  }, [id]);

  // Fetch recipient account details when the account number changes
  useEffect(() => {
    if (toid) {
      console.log("to number",toid)
      axios
        .get(`http://localhost:9000/api/UserAccount/getaccount/${toid}`,{withCredentials:true})
        .then((response) => {
          setRecipientAccount(response.data.accounts[0]); // Set recipient account data
        })
        .catch((error) => {
          setErrorMessage('Recipient account not found.');
        });
    }
  }, [toid]);

  const handleTransferTypeChange = (e) => {
    setTransferType(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!toid || !toEmail || !amount || amount <= 0) {
      setErrorMessage('Please fill out all fields correctly.');
      return;
    }

    if (!account) {
      setErrorMessage('Sender account details not found.');
      return;
    }

    if (!recipientAccount) {
      setErrorMessage('Recipient account details not found.');
      return;
    }

    // Prepare transaction data with the recipient's account ID
    const transactionData = {
      from_account_id: account._id, // Sender's account ID
      to_account_id: recipientAccount._id, // Recipient's account ID (not account number)
      amount: parseFloat(amount),
      transfer_type: transferType,
    };

    try {
      // Use axios to send transaction data to the backend
      const response = await axios.post('http://localhost:9000/api/Transaction/transfer', transactionData,{withCredentials:true});

      if (response.status === 200) {
        // Transaction successful
        navigate(`/transactionreport/${response.data.transaction._id}`); // Redirect to transaction details page
      } else {
        setErrorMessage(response.data.message || 'Transfer failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while processing the transaction.check account balance.');
    }
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Transaction Details</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="transferType" className="block text-gray-700">Transfer Type</label>
            <select
              id="transferType"
              value={transferType}
              onChange={handleTransferTypeChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Wire">Wire</option>
              <option value="NFT">NFT</option>
              <option value="Direct">Direct</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="toid" className="block text-gray-700">Recipient's Account Number</label>
            <input
              type="text"
              id="toid"
              value={toid}
              onChange={(e) => setToid(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="toEmail" className="block text-gray-700">Recipient's Email</label>
            <input
              type="email"
              id="toEmail"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 mb-4">
              <p>{errorMessage}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            >
              Confirm Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
