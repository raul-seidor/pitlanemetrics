import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import "../assets/styles/layout.scss";

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        < Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;