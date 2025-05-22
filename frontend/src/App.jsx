import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import StockBlocks from "./components/StockBlocks";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";

import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <>
      {/* Toasts will show up anywhere in the app */}
      <ToastContainer position="top-center" />
      <Routes>
        {/* public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blocks" element={<StockBlocks />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
