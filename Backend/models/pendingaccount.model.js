const mongoose = require('mongoose');

const PendingAccountSchema = new mongoose.Schema({
  aadhaar: { type: Number, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  account_type: { type: String, required: true },
  account_number: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  document: {
    data: Buffer,           // Store the PDF as binary data (Buffer)
    contentType: String,    // Store the MIME type (e.g., application/pdf)
  },
});

module.exports = mongoose.model('PendingAccount', PendingAccountSchema);
