import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useApp } from "@/context/AppProvider";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to /login, preserving where the user was trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If used as a layout route (no children), render nested routes via Outlet
  // If used as a wrapper (with children), render the children directly
  return children ? children : <Outlet />;
}

