const express = require('express');
const adminrouter = express.Router();
const {signin,signout,signup} = require('../controller/adminAuth.controller.js')

adminrouter.post('/signup', signup)
adminrouter.post('/signin', signin)
adminrouter.get('/signout', signout)

module.exports = adminrouter;
