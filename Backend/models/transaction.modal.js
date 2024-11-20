const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  from_account_id: { type:String, required: true },
  to_account_id: {  type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  transaction_type: { type: String, enum: ["deposit", "withdrawal", "transfer"], required: true },
  transfer_type:{type:String,enum:['Wire', 'NFT', 'Direct']},
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  reference_id: String,
});

module.exports = mongoose.model("Transaction", TransactionSchema);
