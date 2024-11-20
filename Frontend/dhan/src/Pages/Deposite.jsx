import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { a } from "framer-motion/client";

const DepositPage = () => {
  const { id } = useParams(); // Get the 'id' from the URL params
  const [depositType, setDepositType] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState(""); // Account state
  const [my_account_id, setMyAccountId] = useState("");

  // Function to get all accounts
  const getaccountid = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/UserAccount/myapprovedaccountsid", {
        withCredentials: true,
      });

      console.log("Fetched accounts:", response.data.accounts);
      return response.data.accounts; // Return the accounts data
    } catch (err) {
      console.error("Error fetching user data:", err);
      return []; // Return an empty array on error
    }
  };

  // Function to find the account by id
  const getMyAccount = async (id) => {
    const allaccounts = await getaccountid(); // Fetch all accounts
    const my_account = allaccounts.find(account => account.account_number === id); // Find the account with the matching id
    console.log(my_account._id); // Debugging output
    return my_account;
  };

  // useEffect hook to fetch the account on mount
  useEffect(() => {
    const fetchAccount = async () => {
      if (id) {
        const account = await getMyAccount(id); // Get account by id
        console.log(account);
        setAccount(account);
        const my_account_id = account._id;
        console.log(my_account_id);
        setMyAccountId(my_account_id);

        setAccount(account); // Set the account state
      }
    };

    fetchAccount(); // Call the fetchAccount function to get account
  }, [id]); // Re-run the effect if the id changes

  const handleDepositTypeChange = (event) => {
    setDepositType(event.target.value);
    setAmount(""); // Clear amount field when deposit type changes
    setCheckNumber(""); // Clear check number field if deposit type changes
  };

  const handleCheckNumberChange = (event) => {
    setCheckNumber(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let depositAmount = null;
    let depositData = {
      account_id: my_account_id, // Use the id from params
      depositType,
      amount: null,
      checkNumber: null,
    };

    if (depositType === "cash") {
      // Cash deposit - use the entered amount directly
      depositAmount = amount;
      depositData.amount = depositAmount;
    } else if (depositType === "check") {
      // Check deposit - extract the amount from the check number string
      const amountMatch = checkNumber.match(/(\d+)$/); // Regex to capture digits at the end of the string

      if (amountMatch) {
        depositAmount = parseFloat(amountMatch[1]); // Convert the extracted amount to a float
        depositData.amount = depositAmount; // Set the extracted amount
      } else {
        alert("Invalid check number format. Ensure it contains the amount at the end.");
        return;
      }

      depositData.checkNumber = checkNumber; // Include check number
    }

    console.log("Submitting deposit:", depositData);

    // Make the API call to submit the deposit using Axios
    axios
      .post("http://localhost:9000/api/Transaction/deposit", depositData)
      .then((response) => {
        if (response.data.message === "Deposit successfully") {
          alert("cash deposit successful,check deposit sent for approval!");
        } else {
          alert("Error: " + response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error submitting deposit:", error);
        alert("There was an error submitting your deposit. Please try again later.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Deposit Funds</h2>

        {account ? (
          <div>
            <p>Account Number: {account.account_number}</p>
            <p>Account Type: {account.account_type}</p>
          </div>
        ) : (
          <p>Loading account...</p>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-gray-700">Select Deposit Type</label>
          <div className="flex items-center space-x-4 mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="depositType"
                value="cash"
                checked={depositType === "cash"}
                onChange={handleDepositTypeChange}
                className="form-radio text-green-500"
              />
              <span>Cash Deposit</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="depositType"
                value="check"
                checked={depositType === "check"}
                onChange={handleDepositTypeChange}
                className="form-radio text-green-500"
              />
              <span>Check Deposit</span>
            </label>
          </div>

          {/* Amount input for Cash Deposit */}
          {depositType === "cash" && (
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700">Deposit Amount</label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter Deposit Amount"
                required
              />
            </div>
          )}

          {/* Check number input for Check Deposit */}
          {depositType === "check" && (
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700">Check Number</label>
              <input
                type="text"
                value={checkNumber}
                onChange={handleCheckNumberChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter Check Number"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit Deposit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositPage;
