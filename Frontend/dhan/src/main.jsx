import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';  // Main layout component
import Home from './Pages/Home';  // Home page component
import TechPage from './Pages/TechPage';  // TechPage component
import Login from './Pages/Login';  // Login page component
import 'bootstrap/dist/css/bootstrap.min.css';  // Importing Bootstrap styles
import './index.css';  // Custom styles
import DashBoard from './Pages/DashBoard';
import LayoutPostLogin from './components/LayoutPostLogin';
import AboutUs from './Pages/AboutUs';
import AdminDashboard from './Pages/AdminDashboard';
import CreateBankAccountForm from './Pages/CreateAccountForm';
import UserAccountStatus from './Pages/UseraccountStatus';
import AccountDetails from './Pages/AccountDetails';
import DepositPage from './Pages/Deposite';
import PaymentForm from './Pages/payments';
import TransactionHistory from './Pages/TransactionHistory';
import UserProfile from './Pages/profile';
import EditProfile from './Pages/editprofile';
import SuccessfulTransaction from './Pages/sucessfulltranscation';
import Adminlogin from './Pages/Adminlogin';
import Postloginadminlayout from './components/Postloginadminlayout';

// Defining the routes with the `createBrowserRouter`
const router = createBrowserRouter([
  {
    element: <Layout />,  // Wrapping Layout component for all routes
    children: [
      {
        path: '/',  // Root path for Home page
        element: <Home />,
      },
      {
        path: '/tech/:techId',  // Dynamic route for each tech page based on techName
        element: <TechPage />,  // TechPage component for each technology
      },
      {
        path:'/Login',  // Route for Login page
        element: <Login/>
      },
      {path:'/AboutUs',
        element:<AboutUs/>
      }
      
    ],
  },
  {
    element:<LayoutPostLogin/>,
    children: [
      {
        path: '/userdashboard/',  // Dynamic route for each tech page based on techName
        element: <DashBoard />,  // TechPage component for each technology
      },
      {path:'/CreateAccount',
        element:<CreateBankAccountForm/>
      },
      {path:'/useraccountstatus',
        element:<UserAccountStatus/>
      },
      {
        path:'/account/:id',
        element:<AccountDetails />
      },
      {path:'/deposit/:id',
        element:<DepositPage/>
    },
    {
      path:'/payment/:id',
      element:<PaymentForm/>
    },
    {
      path:'/previoustransactions/:id',
      element:<TransactionHistory/>
    },
    {path:'/profile',
      element:<UserProfile/>
    },
    {
      path:'/editprofile',
      element:<EditProfile/>
    },
    {
      path:'/transactionreport/:id',
      Component:<SuccessfulTransaction/>
    }


    ],
  },
  {
    element: <Postloginadminlayout />,  // Wrapping Layout component for all routes
    children: [
      {
        path:'/admin',
        element:<Adminlogin/>
      },
      {
        path:'/admindashboard', 
        element: <AdminDashboard />,
      }
    ]
  
  },
  

]);

// Selecting the root DOM node
const domNode = document.getElementById('root');
const root = createRoot(domNode);

// Rendering the application with StrictMode and RouterProvider for routing
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
