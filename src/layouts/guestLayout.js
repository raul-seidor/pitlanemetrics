import React from "react";
import { Outlet } from 'react-router-dom';
import GuestHeader from "../components/layout/guestHeader";
import Footer from "../components/layout/footer";
import "../assets/styles/layout.scss";

const GuestLayout = () => {
  return (
    <div className="layout-container">
      <GuestHeader />
      <main className="main-content-guest">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GuestLayout;
