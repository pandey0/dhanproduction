import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavBar from './NavBar';
import {Container } from 'react-bootstrap';
import Footer from './footer';

const Layout = () => {
  return (
    <>
    <NavBar/>
            <Container fluid="md" className="mt-4">
                <main>
                    <Outlet />
                 </main>
            </Container>
      <Footer/>
 
    </>
    
  );
};

export default Layout;