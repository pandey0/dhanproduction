
const Admin = require("../models/admin.model.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Constants
const TOKEN_EXPIRES_IN = '7d';
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// Helper function to handle errors
const handleError = (res, error) => {
  return res.status(400).json({ message: error.message });
};


// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    //restric to one admin
    const existingAdminCount = await Admin.countDocuments();
    if (existingAdminCount >= 1) {
    return res.status(400).json({ message: 'Only one admin account is allowed' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    const user = new Admin({
      name,
      email,
      password: hash
    });
    await user.save();

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    res.cookie("token", token);
    res.send("Registered");
  } catch (error) {
    handleError(res, error);
  }
};

// Signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find user by email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    res.cookie("token", token);
    res.send("Login");
  } catch (error) {
    handleError(res, error);
  }
};

// Signout
 const signout = async (req, res) => {
  res.cookie("token", "");
  res.send("Logout");
};

module.exports = { signup, signin, signout }