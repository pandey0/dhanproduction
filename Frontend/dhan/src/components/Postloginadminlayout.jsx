import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
const postloginadminlayout = () => {
  return (
    <>
      <NavbarDashboard />
      <div className="flex">
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default postloginadminlayout;
