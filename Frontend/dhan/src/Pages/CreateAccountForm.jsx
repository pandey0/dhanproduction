import React, { useState } from "react";
import axios from "axios";

const CreateBankAccountForm = () => {
  const [bankaccounttype, setBankaccounttype] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [pdfFile, setPdfFile] = useState(null); // State to store the PDF file
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      setMessage("Please upload a valid PDF file.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!bankaccounttype || !aadhaar || !pdfFile) {
      setMessage("All fields, including PDF file, are required.");
      return;
    }

    setLoading(true);

    // Create FormData to send file and form data as multipart/form-data
    const formData = new FormData();
    formData.append("bankaccounttype", bankaccounttype);
    formData.append("aadhaar", aadhaar);
    formData.append("pdfFile", pdfFile);

    try {
      const response = await axios.post(
        "http://localhost:9000/api/UserAccount/createbankaccount", // Backend route for account creation
        formData,{withCredentials: true});

      setMessage(response.data.message); // Success message from server
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Bank Account</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="bankaccounttype" className="block text-sm font-medium text-gray-700">
            Bank Account Type
          </label>
          <select
            id="bankaccounttype"
            name="bankaccounttype"
            value={bankaccounttype}
            onChange={(e) => setBankaccounttype(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Account Type</option>
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
            <option value="investment">Investment</option>
          </select>
        </div>

        <div>
          <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
          <input
            type="text"
            id="aadhaar"
            name="aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700">Upload PDF (Aadhaar)</label>
          <input
            type="file"
            id="pdfFile"
            name="pdfFile"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Display messages */}
        {message && (
          <div className={`mt-2 text-sm ${message.includes("error") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Account Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateBankAccountForm;
