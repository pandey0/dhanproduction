import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
import Footer from './footer';
const LayoutPostLogin = () => {
  return (
    <>
      <NavbarDashboard />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LayoutPostLogin;
