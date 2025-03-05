# Dhan Bank Application

The Dhan Bank application is a modern, scalable, and secure digital banking system designed to offer users a seamless banking experience. Built using cutting-edge technologies, the app ensures high-performance transaction processing, robust security, and a user-friendly interface. This application bridges the gap between traditional banking and the real-time needs of today's financial world, offering services to both individual customers and businesses.

## Features

### 1. Core Features

- **Real-time Transaction Processing**: High-volume, real-time transactions such as transfers, bill payments, and account withdrawals are processed seamlessly using a microservices architecture.
- **Security and Compliance**: Multi-layered security protocols such as two-factor authentication (2FA), encryption, and role-based access control (RBAC) ensure robust data protection. The system complies with PCI DSS and GDPR standards.
- **User-Centric Interface**: Built with ReactJS and styled using TailwindCSS, the app offers a responsive, mobile-first interface accessible across devices.
- **Account Management**: Users can view real-time balances, transaction history, and manage multiple accounts with ease.
- **Banking Transactions**: Includes money transfers, bill payments, fund deposits, and ATM withdrawals, all processed instantly.
- **Customer Support**: Live chat feature for real-time assistance and a contact page for inquiries and feedback.
- **Notifications and Alerts**: Customizable alerts for transaction success, low balances, bill reminders, and suspicious activities.

### 2. Architecture Overview

- **Frontend**: ReactJS, TailwindCSS for styling. Modular components provide flexibility for future updates.
- **Backend**: Built with Node.js and Express.js, using REST APIs for transaction processing, account management, and more. MongoDB is used for data storage.
- **Microservices**: The app is built with a microservices architecture to allow scaling and independent service management. 
- **Authentication & Authorization**: JWT (JSON Web Tokens) for secure login and token-based access.

### 3. User Roles

- **Customers**: Primary users who manage accounts, make transactions, track spending, and interact with the app's features.
- **Bank Employees (Admin)**: Admins monitor transactions, handle customer requests, and manage account approvals.

### 4. Scalability and Performance

- The application is designed to handle large user bases and transaction volumes with microservices, load balancing, and database sharding to ensure scalability. The app also leverages cloud infrastructure (e.g., AWS or Google Cloud) for high availability and horizontal scaling.

### 5. Security Features

- **Data Encryption**: Sensitive data is encrypted using industry-standard protocols like bcrypt to ensure user privacy and data integrity.

---

## Features with Different Module Details

### User Module

- **Registration**: Users can sign up with email, phone, and personal details.
- **Login**: After registration, users log in using their credentials.
- **Account Creation**: Users can create savings or current accounts, with document upload and Aadhar number verification.
- **Account Management**: Admin approval required for account activation, after which users can manage their accounts.
- **Deposits**: Users can deposit cash or checks (admin verification required for check deposits).
- **Transfer Funds**: Money transfer between accounts.
- **Transaction History**: Users can view deposits, withdrawals, and transfers.

### Admin Module

- **Account Verification**: Admin can approve or reject account creation requests.
- **Check Verification**: Admin verifies checks before processing deposits.

---

## Screenshots of Application UI

- **Landing Page**: [http://localhost:5173/](http://localhost:5173/)
- ![image](https://github.com/user-attachments/assets/1376e1eb-5625-439a-bcaf-88b02c4b145d)

- **Login Page**:
  - User: [http://localhost:5173/Login](http://localhost:5173/Login)
  - ![image](https://github.com/user-attachments/assets/df24106c-37c7-48ee-8259-52513555ace9)

  - Admin: [http://localhost:5173/admin](http://localhost:5173/admin)
  - ![image](https://github.com/user-attachments/assets/10b717ea-0643-4283-b211-ccd9c857e4e0)

- **Registration Page**: For both User and Admin
- ![image](https://github.com/user-attachments/assets/555c9e61-ad88-4188-a5ea-006b407726c7)
![image](https://github.com/user-attachments/assets/f02fd715-384f-4a4b-bf2c-4a60aec2c3fb)


- **Dashboard**: User and Admin Dashboards showing account details.
-![image](https://github.com/user-attachments/assets/95bf0e05-2d17-4026-bd77-55dfc3a2c865)

- ![image](https://github.com/user-attachments/assets/80dda8cc-d14a-4aed-94ea-b470a4202e96)

- **Account Creation Page**: Form for entering Aadhar number, account type, and document upload.
- ![image](https://github.com/user-attachments/assets/cd28e806-7de3-48a5-914a-e1f3ac5576fa)

- **Pending Accounts Page**: Admin page for approving or rejecting accounts.
- ![image](https://github.com/user-attachments/assets/f554b6c7-4a35-4239-b52c-82841f4037ba)

- **Transaction History Page**: Displays previous transactions.
- ![image](https://github.com/user-attachments/assets/1b67a912-7a51-4763-8030-2dcb89c46fc5)
-
- ![image](https://github.com/user-attachments/assets/691cfa9a-89ea-4ecb-83c8-ec61781587b7)
- ![image](https://github.com/user-attachments/assets/9d155cfb-eef9-4c3d-b635-17fe8a1512d3)
- ![image](https://github.com/user-attachments/assets/890a11a1-b3bd-4a82-8afd-853ae80c099c)
- ![image](https://github.com/user-attachments/assets/cd9660ed-a2c1-4e46-b891-b83ea948d283)
- ![image](https://github.com/user-attachments/assets/ac17f475-5466-402a-b98a-383fd04b734b)
- ![image](https://github.com/user-attachments/assets/72ebe229-4f71-4091-a8d0-5b8db9f8cad7)
- ![image](https://github.com/user-attachments/assets/602f0eff-a854-4740-9e8d-f5b747a179c6)
- ![image](https://github.com/user-attachments/assets/f139ece5-c903-4a33-851e-e13bce521ee8)
- ![image](https://github.com/user-attachments/assets/ee5cea34-f404-4cb4-a661-6ed4613a83b9)
- ![image](https://github.com/user-attachments/assets/d782ad33-eaff-4af8-8e13-86881eb5b372)
- ![image](https://github.com/user-attachments/assets/10cfac30-5bb2-442c-97b1-bf84cbfbb51c)
---

## Backend API Endpoints

### User Authentication Endpoints (`/api/Userauth`)

- **POST /signup**: Register a new user.
- **POST /signin**: Log in a user.
- **GET /signout**: Log out a user.

### User Account Endpoints (`/api/UserAccount`)

- **POST /createbankaccount**: Create a new bank account (requires authentication).
- **GET /previoustransactions/:id**: View previous transactions.
- **POST /maketransaction**: Make a transaction (deposit/transfer).
- **GET /viewaccountstatus**: View account status (requires authentication).

### Admin Authentication Endpoints (`/api/AdminAuth`)

- **POST /signup**: Register a new admin.
- **POST /signin**: Log in an admin.
- **GET /signout**: Log out an admin.

### Admin Account Management Endpoints (`/api/AdminAccount`)

- **GET /gettogetapprovalbankaccount**: Get list of pending accounts for approval.
- **PUT /updateaccountstatus/:id**: Approve or reject account.
- **GET /pendingaccountdocument/document/:id**: Get document for pending account approval.

### Transaction Endpoints (`/api/Transaction`)

- **POST /transfer**: Transfer funds from one account to another.
- **POST /deposit**: Deposit funds into a user’s account.

---

## Frontend Routes Overview

### Main Layout Routes (Public Routes)

- **Home Page**: `/` (Component: `<Home />`)
- **Tech Page**: `/tech/:techId` (Component: `<TechPage />`)
- **Login Page**: `/Login` (Component: `<Login />`)
- **About Us Page**: `/AboutUs` (Component: `<AboutUs />`)

### Post-login Layout Routes (User Dashboard and Account Management)

- **User Dashboard**: `/userdashboard/` (Component: `<DashBoard />`)
- **Create Bank Account Page**: `/CreateAccount` (Component: `<CreateBankAccountForm />`)
- **User Account Status**: `/useraccountstatus` (Component: `<UserAccountStatus />`)
- **Account Details**: `/account/:id` (Component: `<AccountDetails />`)
- **Deposit Funds**: `/deposit/:id` (Component: `<DepositPage />`)
- **Transaction History**: `/previoustransactions/:id` (Component: `<TransactionHistory />`)

### Admin Layout Routes (Admin Dashboard)

- **Admin Login**: `/admin` (Component: `<Adminlogin />`)
- **Admin Dashboard**: `/admindashboard` (Component: `<AdminDashboard />`)

---

## Conclusion

The Dhan Bank application is a robust, secure, and scalable digital banking platform. It leverages the latest technologies to provide real-time transaction processing, secure banking, and an intuitive user experience. Whether you're a customer or a bank employee, this application offers a wide range of features to meet modern banking needs.

--- 

Feel free to contribute, and for any questions or issues, please raise them in the Issues section!
