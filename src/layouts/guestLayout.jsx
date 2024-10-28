import React from "react";
import { Outlet } from "react-router-dom";
import GuestHeader from "../components/layout/guestHeader";
import Footer from "../components/layout/footer";
import "../assets/styles/layout.css";

/**
 * GuestLayout component.
 *
 * This component defines the layout for guest users. It includes a header, main content area, and a footer.
 * The main content area renders the matched child route component using the Outlet from react-router-dom.
 *
 * @returns {JSX.Element} The layout structure for guest users.
 */
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
