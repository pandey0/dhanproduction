const mongoose = require("mongoose");
const AccountSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  user_name:{type:String},
  account_type: { type: String, required: true },
  account_number: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: "IND" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("VerifiedAccount", AccountSchema);

