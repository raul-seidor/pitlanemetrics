import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import "../assets/styles/layout.scss";

/**
 * Layout component for the main pages of the application.
 *
 * It renders a div with three main parts: the header, the main content and the footer.
 * The main content is filled with the component routed to the current path.
 * The component uses the .layout-container class from the layout.scss file.
 */

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
