
const userModel = require("../models/user.model.js");
const PendingAccount = require("../models/pendingaccount.model.js")
const VerifiedAccount = require("../models/useraccount.model.js")
const Transaction = require("../models/transaction.modal.js")
const random = require("random-js");
const { get } = require("mongoose");
const { Random } = require("random");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { use } = require("../Routes/auth.route.js");
const storage = multer.memoryStorage();  // Store the uploaded file in memory
const upload = multer({ storage: storage }).single('pdfFile');  // Only allow single file upload


const createBankAccount = async (req, res) => {
    try {
      // Handle file upload
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: "Error uploading file" });
        }
  
        // Access the uploaded PDF file from req.file
        const { bankaccounttype, aadhaar } = req.body;
        const pdfFile = req.file;  // The uploaded PDF file is stored here
  
        if (!bankaccounttype || !aadhaar || !pdfFile) {
          return res.status(400).json({ message: "All fields, including PDF file, are required." });
        }
  
        const userbankaccountTOBeCreated = await userModel.findOne({ _id: req.user._id });
        if (!userbankaccountTOBeCreated) {
          return res.status(404).json({ message: "User not found" });
        }
  
        // Generate a random account number
        const random = Math.floor(Math.random() * 1000000000);
        const accountNumber = `DHAN${random.toString().padStart(10, '0')}`;
  
        // Create new PendingAccount document
        const newPendingAccount = new PendingAccount({
          aadhaar,
          user_id: req.user._id,
          name: userbankaccountTOBeCreated.name,
          email: userbankaccountTOBeCreated.email,
          address: userbankaccountTOBeCreated.address,
          phone: userbankaccountTOBeCreated.phone,
          account_type: bankaccounttype,
          account_number: accountNumber,
          status: "pending",
          created_at: Date.now(),
          document: {
            data: pdfFile.buffer,  // Store PDF file as binary data
            contentType: pdfFile.mimetype,  // Store the file type (MIME type)
          },
        });
  
        // Save the new pending account to MongoDB
        await newPendingAccount.save();
        res.status(200).json({ message: "Account request sent for approval" });
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };
const transactionsHistory = async(req,res) => {
  const id = req.params.id;

  console.log("The ID is:", id);//id is the account number

  try {
    // Step 1: Find the account based on the provided accountNumber
    const account = await VerifiedAccount.findOne({ account_number: id });

    // If account not found, return a 404 error
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Get the accountId (which is the _id of the account document)
    const accountId = account._id.toString(); // Convert to string to match the format in the Transaction model

    // Step 2: Fetch transactions related to this account (either from_account_id or to_account_id)
    const transactions = await Transaction.find({
      $or: [
        { from_account_id: accountId },
        { to_account_id: accountId }
      ]
    }).sort({ timestamp: -1 }); // Sort by most recent transaction first

    // Respond with the transactions
    res.json({ transactions });

  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions.' });
  }
};

const Maketransaction = async(req,res) => {
    res.send("Maketransaction")
}
const viewaccountstatus = async(req,res) => {
    //give the account in the pendinding account database of that particular user
    const currentuserid = req.user
    const pendingaccount = await PendingAccount.find({user_id:currentuserid})
    let payloaddata =pendingaccount
    console.log(payloaddata)

    res.send(payloaddata)

}
const myapprovedaccounts = async (req,res) =>{
  const currentuserid = req.user
  const useraccounts = await VerifiedAccount.find({user_id:currentuserid})
  let payloaddata = {user:req.user,accounts:useraccounts}

  res.send(payloaddata)
}
const myapprovedaccountsid = async (req,res) =>{
  const currentuserid = req.user
  const useraccounts = await VerifiedAccount.find({user_id:currentuserid})
  let payloaddata = {user:req.user,accounts:useraccounts}

  res.send(payloaddata)
}
const myapprovedaccountsaccountnumber = async (req, res) => {
  try {
    // Extract the account number from the request params
    const currentusernumber = req.params.id;
    console.log("this is the account number:",currentusernumber);

    // Query the database to find the accounts associated with the provided account_number
    const useraccounts = await VerifiedAccount.find({ account_number: currentusernumber });

    // If no accounts are found, return an appropriate response
    if (useraccounts.length === 0) {
      return res.status(404).send({ message: "No accounts found for this account number." });
    }

    // Send the user accounts in the response
    const payloaddata = { accounts: useraccounts };
    res.send(payloaddata);
  } catch (error) {
    // Catch any errors and send an error response
    console.error(error);
    res.status(500).send({ message: "An error occurred while fetching the accounts." });
  }
};


const profile = async (req, res) => {
  const currentuserid = req.user
  const userdetails = await userModel.findOne({ _id: currentuserid })
  let payloaddata = { user: req.user, details: {
    username: userdetails.name,
    email: userdetails.email,
    phone: userdetails.phone,
    address: userdetails.address
  } }

  res.send(payloaddata)
}
const editprofile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Find the user by ID (from the authenticated user)
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user profile with the provided data
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};
const transactionscompletion = async(req,res) => {
  const id = req.params.id;

  console.log("The ID is:", id);//id is the account number

  try {
    // Step 1: Find the account based on the provided accountNumber
    const transaction = await VerifiedAccount.findOne({ _id: id });

    // If account not found, return a 404 error
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    // Respond with the transactions
    res.json({ transaction });

  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions.' });
  }
};

module.exports = {createBankAccount,transactionsHistory,Maketransaction,viewaccountstatus,myapprovedaccounts,myapprovedaccountsid,profile,editprofile,myapprovedaccountsaccountnumber,transactionscompletion}