const mongoose = require("mongoose");
const Transaction = require("../models/transaction.modal.js");
const Account = require("../models/useraccount.model.js");
const kafkaProducer = require("../kafka/producer.js"); // Kafka producer instance

async function transferFunds(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Destructure the fields from the request body
    const { from_account_id, to_account_id, amount, transfer_type } = req.body;

    // Validate all required fields
    if (!from_account_id || !to_account_id || !amount || !transfer_type ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate transfer type
    const validTransferTypes = ['Wire', 'NFT', 'Direct'];
    if (!validTransferTypes.includes(transfer_type)) {
      return res.status(400).json({ message: 'Invalid transfer type.' });
    }

    // Fetch accounts
    const fromAccount = await Account.findById(from_account_id).session(session);
    const toAccount = await Account.findById(to_account_id).session(session);

    // Ensure both accounts exist
    if (!fromAccount || !toAccount) {
      return res.status(400).json({ message: 'Invalid account details' });
    }

    // Check if sufficient balance
    if (fromAccount.balance < amount) {
      throw new Error("Insufficient funds");
    }

    // Update balances
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    await fromAccount.save();
    await toAccount.save();

    // Create a new transaction
    const transaction = new Transaction({
      from_account_id,
      to_account_id,
      amount,
      transfer_type, // Store the transfer type
      transaction_type: 'transfer',
      status: 'completed',
      reference_id: `TXN-${new Date().getTime()}`, // Optional reference ID
    });
    console.log(transaction)
    await transaction.save({ session });

    // Commit transaction
    await session.commitTransaction();

    try {
      // Send transaction event (optional)
      await kafkaProducer.sendTransactionEvent(transaction);
    } catch (kafkaError) {
      console.error('Error sending Kafka event:', kafkaError);
    }

    // Send success response
    res.status(200).json({
      message: 'Transfer successful',
      transaction,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Transaction failed', error: error.message });
  } finally {
    session.endSession();
  }
}


const depositFunds = async (req, res) => {
  const { account_id, depositType, amount, checkNumber } = req.body;

  if (!account_id || !depositType || 
      (depositType === "cash" && !amount) || 
      (depositType === "check" && !checkNumber)) {
    return res.status(400).json({ message: "Invalid deposit data" });
  }

  try {
    const account = await Account.findById(account_id);
    if (!account) {
      return res.status(400).json({ message: "Account not found" });
    }

    const transactionType = "deposit";
    const referenceId = depositType === "check" ? checkNumber : null;

    const newTransaction = new Transaction({
      from_account_id: account_id,
      to_account_id: account_id,
      amount: amount,
      transaction_type: transactionType,
      reference_id: referenceId,
      status: "pending",
    });

    await newTransaction.save();

    // If cash deposit, immediately update balance
    if (depositType === "cash") {
      account.balance += parseFloat(amount);
      const updatestatus = await Transaction.findOneAndUpdate(
        { _id: newTransaction._id },
        { status: "completed" },
        { new: true }
      )
      await account.save();
      res.status(201).json({
        message: "Deposit successfully"
      })
    } else {
      res.status(201).json({
        message: "Deposit successfully",
        transaction: newTransaction
      })
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

module.exports = { transferFunds, depositFunds };
