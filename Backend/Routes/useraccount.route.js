const express = require('express');
const useraccountrouter = express.Router();
const {createBankAccount,transactionsHistory,Maketransaction,viewaccountstatus,myapprovedaccounts,myapprovedaccountsid,profile,editprofile,myapprovedaccountsaccountnumber,transactionscompletion} = require('../controller/useraccountfunction.controller.js')
const Middleware = require('../utils/authtoken.js')
useraccountrouter.post('/createbankaccount', Middleware,createBankAccount)
useraccountrouter.get('/previoustransactions/:id',Middleware ,transactionsHistory)
useraccountrouter.post('/maketransaction', Maketransaction)
useraccountrouter.get('/viewaccountstatus', Middleware,viewaccountstatus)
useraccountrouter.get('/myaccounts', Middleware,myapprovedaccounts)
useraccountrouter.get('/myapprovedaccountsid', Middleware,myapprovedaccountsid)
useraccountrouter.get('/profile', Middleware,profile)
useraccountrouter.put('/editprofile',Middleware,editprofile)
useraccountrouter.get('/getaccount/:id',Middleware,myapprovedaccountsaccountnumber)
useraccountrouter.get('/transactionscompletion/:id',Middleware,transactionscompletion)


module.exports = useraccountrouter;
