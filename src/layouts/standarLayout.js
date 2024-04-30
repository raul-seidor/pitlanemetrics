import React from "react";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import "../assets/styles/layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;