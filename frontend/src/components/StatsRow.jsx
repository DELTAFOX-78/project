import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StatsRow() {
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    // 1) load
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // 2) filter on percentInStock
    const below20 = products.filter((p) => {
      // if you have percentInStock use it, otherwise fallback to stock/capacity
      if (typeof p.percentInStock === "number") {
        return p.percentInStock < 20;
      }
      if (p.stock != null && p.capacity) {
        return p.stock / p.capacity < 0.2;
      }
      return false;
    });

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
  }, []); // empty deps → runs on mount / refresh

  const stats = [
    { id: 1, title: "Future Stock", value: "1,245 units", icon: "📦" },
    {
      id: 2,
      title: "Emergency Alerts",
      value: `${lowStock.length} products`,
      icon: "⚠️",
    },
    {
      id: 3,
      title: "Recent Purchase Trend",
      value: "📈 Up 12%",
      icon: "🛒",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 px-6">
      {stats.map((s) => (
        <div
          key={s.id}
          className="card flex-1 bg-base-100 shadow-lg hover:shadow-xl transition p-4"
        >
          <div className="flex items-center">
            <div className="text-3xl mr-4">{s.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{s.title}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
