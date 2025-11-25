import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";

import ProtectedRoute from "./privaterouting/ProtectedRoute";
import useGetCurrentUser from "./hooks/useGetCurrent";
import UserDashboards from "./components/User/UserDashboards";
import AdminDashboards from "./components/Admin/AdminDashboards";

export const serverUrl = "http://localhost:8000";

const App = () => {
  const loading = useGetCurrentUser();
  const { userData } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <h1>Oops! Something went wrong 😥</h1>,
      children: [
        { path: "/", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "signup", element: !userData ? <SignUp /> : <Home /> },
        { path: "signin", element: !userData ? <SignIn /> : <Home /> },
        {
          path: "forgot-password",
          element: !userData ? <ForgotPassword /> : <Home />,
        },
        {
          path: "user-dashboard",
          element: (
            <ProtectedRoute allowedRole="user" loading={loading}>
              <UserDashboards />
            </ProtectedRoute>
          ),
        },
        {
          path: "admin-dashboard",
          element: (
            <ProtectedRoute allowedRole="admin" loading={loading}>
              <AdminDashboards />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
