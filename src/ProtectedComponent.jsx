import React from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "./auth/AuthContext";

function ProtectedComponent() {
  const { token } = useAuth();

  return <div>{token ? <Outlet /> : <Navigate to="/login" />}</div>;
}
export default ProtectedComponent;
