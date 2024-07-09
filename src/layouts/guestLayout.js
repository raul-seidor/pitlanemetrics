import React from "react";
import { Outlet } from 'react-router-dom';
import GuestHeader from "../components/layout/guestHeader";
import Footer from "../components/layout/footer";
import "../assets/styles/layout.scss";

const GuestLayout = () => {
  return (
    <div className="layout-container">
      <GuestHeader />
      <h1>No Auth</h1>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GuestLayout;
