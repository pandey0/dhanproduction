const express = require('express');
const adminaccountrouter = express.Router();
const   {getToGetApprovalBankAccount}  = require('../controller/adminaccount.controller.js')
const   {updateAccountStatus}  = require('../controller/adminaccount.controller.js')
const   {pendingaccountdetails,togetapprovalchecktransactiondetails,updatetransactionStatus}  = require('../controller/adminaccount.controller.js')



adminaccountrouter.get('/gettogetapprovalbankaccount', getToGetApprovalBankAccount)
adminaccountrouter.put('/updateaccountstatus/:id', updateAccountStatus)
adminaccountrouter.get('/pendingaccountdocument/document/:id',pendingaccountdetails)
adminaccountrouter.get('/pendingdepositortransactions',togetapprovalchecktransactiondetails)
adminaccountrouter.put('/updateTransactionStatus/:id/',updatetransactionStatus)

module.exports = adminaccountrouter;