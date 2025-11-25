import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav";

const Layout = () => {
  const location = useLocation();

  const hideNavRoutes = ["/user-dashboard", "/admin-dashboard"];

  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideNav && <Nav />}
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
