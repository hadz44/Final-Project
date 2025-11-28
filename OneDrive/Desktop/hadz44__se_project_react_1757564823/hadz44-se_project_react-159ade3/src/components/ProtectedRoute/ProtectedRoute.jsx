import React from "react";
import { Navigate } from "react-router-dom";
import "./ProtectedRoute.css";

function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

