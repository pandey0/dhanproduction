// In `routes/transactions.js`
const express = require("express");
const { transferFunds,depositFunds } = require("../controller/transactions.controller.js");
const transactionrouter = express.Router();

transactionrouter.post("/transfer", transferFunds);
transactionrouter.post("/deposit", depositFunds);

module.exports = transactionrouter;
