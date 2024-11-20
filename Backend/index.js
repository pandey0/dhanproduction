const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db_connect.js');
const authroute = require('./Routes/auth.route.js');
const adminaccountroute = require('./Routes/adminaccount.route.js');
const transactionroute = require('./Routes/transaction.route.js');
const useraccountroute = require('./Routes/useraccount.route.js');
const adminroute = require('./Routes/admin.route.js');
dotenv.config();
const app = express();
var cors = require('cors')
app.use(cors({
    origin: 'http://localhost:5173', // replace with your React app's origin
    credentials: true, // Allow cookies to be sent
  }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

app.use('/api/Userauth',authroute)
app.use('/api/UserAccount',useraccountroute)
app.use('/api/AdminAuth',adminroute)
app.use('/api/AdminAccount',adminaccountroute)
app.use('/api/Transaction',transactionroute)


app.listen(9000, () => {
    connectDB();
    console.log('Server started on port 9000')
});