import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import CartDrawer from './CartDrawer';
import AltitudeScroll from './AltitudeScroll';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-alabaster">
      <ScrollToTop />
      <Navbar />
      <AltitudeScroll />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </div>
  );
}