import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRole, loading }) => {
  const { userData } = useSelector((state) => state.user);

  if (loading) return null;

  if (!userData) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRole && userData.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
