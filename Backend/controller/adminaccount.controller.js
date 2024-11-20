const PendingAccount = require("../models/pendingaccount.model.js")
const VerifiedAccount = require("../models/useraccount.model.js")
const transaction =require("../models/transaction.modal.js")

const getToGetApprovalBankAccount = async(req,res) => {
    const pendingaccount = await PendingAccount.find()
    
    console.log(pendingaccount)

    res.send(pendingaccount)
}
// Function to update the status of a PendingAccount and create VerifiedAccount
const updateAccountStatus = async (req, res) => {
  try {
    const { id } = req.params;  // Extracting the ID from the route params
    const { status } = req.body;  // Extracting the status (approved/rejected) from the body

    // Step 1: Update the status of the PendingAccount
    const pendingAccount = await PendingAccount.findByIdAndUpdate(id, { status: status }, { new: true });

    if (!pendingAccount) {
      return res.status(404).json({ message: 'Pending account not found' });
    }

    // Step 2: If status is "approved", create VerifiedAccount
    if (status === 'approved') {
      // Create a new VerifiedAccount based on the PendingAccount
      const verifiedAccount = new VerifiedAccount({
        user_id: pendingAccount.user_id,
        user_name:pendingAccount.name,  // Link to the same user
        account_type: pendingAccount.account_type,
        account_number: pendingAccount.account_number, // Ensure account number is valid
        balance: 0, // Default balance (can be changed later)
        currency: "IND", // Default currency (adjust as needed)
      });

      // Save the VerifiedAccount to the database
      const savedVerifiedAccount = await verifiedAccount.save();

      if (savedVerifiedAccount) {
        // Step 3: Delete the PendingAccount after successful verification
        await PendingAccount.findByIdAndDelete(id);
        console.log("Deleted from PendingAccount:", pendingAccount);

        return res.send("Account created and verified successfully");
      } else {
        return res.status(400).json({ message: 'Account verification failed' });
      }
    } 
    
    // Step 4: If status is "rejected", respond with a rejection message
    else if (status === 'rejected') {
      return res.send("Account has been rejected");
    } 

    // If status is invalid
    return res.status(400).json({ message: 'Invalid status provided' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error during account verification' });
  }
};
const pendingaccountdetails = async(req,res) => {
    try {
        const { id } = req.params;  // Get the ID of the pending account
        // Fetch the pending account by its ID
        console.log(id)
        const pendingAccount = await PendingAccount.findById(id);
    
        if (!pendingAccount) {
          return res.status(404).json({ message: 'Pending account not found' });
        }
    
        // Check if the document exists
        if (!pendingAccount.document || !pendingAccount.document.data) {
          return res.status(404).json({ message: 'No document found for this pending account' });
        }
    
        // Set the appropriate content type for the PDF
        res.setHeader('Content-Type', pendingAccount.document.contentType);
        res.setHeader('Content-Disposition', 'inline; filename="document.pdf"'); // Optional to display in browser
    
        // Send the PDF document as a response (binary data)
        return res.send(pendingAccount.document.data);
    
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching the document', error: error.message });
      }
    };
    const togetapprovalchecktransactiondetails = async (req, res) => {
      try {
        // Corrected the query syntax
        const pendingchecktransaction = await transaction.find({
          transaction_type: "deposit",
          status: "pending"
        });
    
        console.log(pendingchecktransaction); // You can remove this once you're sure the query works
    
        res.send(pendingchecktransaction);
      } catch (err) {
        // If there's an error, send an error response
        console.error(err);
        res.status(500).send("An error occurred while fetching transactions.");
      }
    };
    const updatetransactionStatus = async (req, res) => {
      try {
        const { id } = req.params;  // Extracting the ID from the route params
        const { status } = req.body;  // Extracting the status (approved/rejected) from the body
    
        // Step 1: Validate status input
        if (!['approved', 'rejected'].includes(status)) {
          return res.status(400).json({ message: 'Invalid status provided. Status must be "approved" or "rejected".' });
        }
    
        // Step 2: Find the transaction by ID
        const toupdatetransaction = await transaction.findById(id);
        
        if (!toupdatetransaction) {
          return res.status(404).json({ message: 'Transaction not found' });
        }
    
        // Step 3: Handle different statuses
        if (status === 'approved') {
          // Update the transaction status to 'completed'
          toupdatetransaction.status = 'completed';
          await toupdatetransaction.save();
    
          // Step 3.1: Find the user and update their balance
          const user = await VerifiedAccount.findById(toupdatetransaction.from_account_id);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
    
          // Add the transaction amount to the user's balance
          user.balance += toupdatetransaction.amount;  // Assuming 'amount' is the field in the transaction
          await user.save();  // Save the updated user balance
    
          return res.status(200).json({
            message: 'Transaction approved and amount added to user account',
            transaction: toupdatetransaction,
            userBalance: user.balance
          });
    
        } else if (status === 'rejected') {
          // If status is "rejected", update the transaction status to 'failed'
          toupdatetransaction.status = 'failed';
          await toupdatetransaction.save();
    
          return res.status(200).json({
            message: 'Transaction rejected',
            transaction: toupdatetransaction
          });
        }
    
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error during transaction update' });
      }
    };
    
    

module.exports = {getToGetApprovalBankAccount,pendingaccountdetails,updateAccountStatus,togetapprovalchecktransactiondetails,updatetransactionStatus};