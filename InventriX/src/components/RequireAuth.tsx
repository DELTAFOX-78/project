// src/components/RequireAuth.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const isAuth = localStorage.getItem("isLoggedIn") === "true";
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
