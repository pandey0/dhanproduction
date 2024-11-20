const mongoose = require("mongoose");
const adminschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Admin", adminschema);