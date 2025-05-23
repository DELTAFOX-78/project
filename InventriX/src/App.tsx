import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import DashboardHeader from "./components/Dashboard/DashboardHeader";
import Sidebar from "./components/Dashboard/Sidebar";
import StatCard from "./components/Dashboard/StatCard";
import InventoryLineChart from "./components/Charts/InventoryLineChart";
import CategoryPieChart from "./components/Charts/CategoryPieChart";
import InventoryList from "./components/Inventory/InventoryList";
import ReportsPage from "./components/Reports/ReportsPage";
import SuppliersPage from "./components/Suppliers/SuppliersPage";
import {
  products,
  generateStockHistory,
  generateProductChartData,
  inventoryChartData,
  statCardsData,
  categoryDistribution,
} from "./data/mockData";
import AddProduct from "./components/AddProduct";
import axios from "axios";

function Dashboard() {
  const [addProduct, setAddProduct] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("inventory");
  const [loading, setLoading] = React.useState(true);
  const [lowStock, setLowStock] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  React.useEffect(() => {
    getProducts();
  }, []); // Remove products dependency

  const sendAlert = async () => {
    // 1) load

    const products = JSON.parse(localStorage.getItem("products") || "[]");
    console.log("products", products);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // 2) filter on percentInStock
    const below20 = products.filter((p: any) => {
      // if you have percentInStock use it, otherwise fallback to stock/capacity
      if (p.quantity < 20) {
        return true;
      }
      return false;
    });
    console.log("below20", below20);

    setLowStock(below20);

    // 3) send email every time on mount/refresh
    if (user.email) {
      axios
        .post("http://localhost:5000/send-alert-email", {
          to: user.email,
          lowStockProducts: below20,
        })
        .then(() => {
          console.log("Alert email sent");
        })
        .catch((err) => {
          console.error("Failed to send alert email:", err);
        });
    }
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();

      setProductsList(() => {
        const suppliers = [
          "Global Supply Co.",
          "Tech Distributors Ltd.",
          "Quality Goods Inc.",
          "Prime Vendors",
          "Elite Supply Chain",
        ];
        const products = data.map((product: any) => ({
          ...product,
          status: product.quantity < 20 ? "Low Stock" : "In Stock",
          supplier: [suppliers[Math.floor(Math.random() * suppliers.length)]],
          history: generateStockHistory(5),
          stockHistory: generateProductChartData(),
        }));
        return products;
      }); // Update state
      statCardsData[0].value = data.length;
      statCardsData[1].value = data.filter(
        (product: any) => product.quantity < 20
      ).length;

      parseInt(statCardsData[1].value.toString()) > 0 && sendAlert();

      localStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "inventory":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              {statCardsData.map((stat, index) => (
                <StatCard key={index} data={stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <InventoryLineChart data={inventoryChartData} />
              </div>
              <div className="lg:col-span-1">
                <CategoryPieChart data={categoryDistribution} />
              </div>
            </div>

            <div>
              <InventoryList products={productsList} />
            </div>
          </>
        );
      case "reports":
        return <ReportsPage />;
      case "suppliers":
        return <SuppliersPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
      {addProduct && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
          <AddProduct
            setAddProduct={setAddProduct}
            setProducts={setProductsList}
          />
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <DashboardHeader
          setAddProduct={setAddProduct}
          toggleSidebar={toggleSidebar}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">{renderPage()}</div>
          </main>
        )}
      </div>
    </div>
  );
}

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
          {/* <Route path="/blocks" element={<StockBlocks />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} /> */}
        </Route>

        {/* catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
