const express = require('express');
const authrouter = express.Router();
const {signin,signout,signup} = require('../controller/auth.controller.js')

authrouter.post('/signup', signup)
authrouter.post('/signin', signin)
authrouter.get('/signout', signout)

module.exports = authrouter;
