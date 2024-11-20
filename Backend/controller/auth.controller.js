const usermodel = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const signup = async (req, res) => {
    let { name, email, password, phone, address } = req.body;
    console.log(req.body);

    try {
        // Check if all fields are provided
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        let user = await usermodel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user document
        const newUser = new usermodel({
            name,
            email,
            password: hashedPassword,
            phone: parseFloat(phone),
            address
        });

        // Save the user to the database
        const usersaved = await newUser.save();
        if (!usersaved) {
            console.log(usersaved);
            return res.status(400).json({ message: 'User could not be created' });
        }

        // Generate a JWT token
        let token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });

        // Set the token in a cookie (consider using additional security settings)
        res.cookie("token", token, {
            httpOnly: true,   // Only accessible via HTTP(S), not JavaScript
            secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
            sameSite: 'strict'  // Prevents CSRF attacks
        });

        // Send a success response
        res.status(200).json({ message: 'Successfully registered' });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};


const signin = async(req,res) => {
    const { email, password } = req.body; 
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    const user = await usermodel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    let token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
    res.cookie("token", token,{
        httpOnly: true,
        sameSite: "None",
        secure: true
})
    res.send("login");


}



const signout = async(req,res) => {
    res.cookie("token", "");
    res.send("logout");
}

module.exports = { signup, signin, signout }