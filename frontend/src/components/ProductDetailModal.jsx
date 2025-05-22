// src/components/ProductDetailModal.jsx
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ProductDetailModal({
  product: initialProduct,
  onClose,
}) {
  const [product, setProduct] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [variant, setVariant] = useState("All");

  // 1️⃣ On mount (or when initialProduct changes), reload from localStorage
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("products") || "[]");
    const found = all.find((p) => p.id === initialProduct.id);
    setProduct(found || initialProduct);
  }, [initialProduct]);

  // 2️⃣ Anytime we open or change variant, generate new random data
  useEffect(() => {
    if (!product) return;
    // create 7 days of data ending today
    const days = 7;
    const today = new Date();
    const data = Array.from({ length: days }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (days - 1 - i));
      // baseline from overall or variant stock
      const baseStock =
        variant === "All"
          ? product.overall?.currentStock ?? 50
          : product.variantsData?.[variant]?.currentStock ?? 50;
      // random around baseStock
      const purchased = Math.max(
        0,
        Math.round(baseStock * (0.5 + Math.random() * 0.5))
      );
      const sold = Math.max(0, Math.round(purchased * Math.random()));
      return {
        date: d.toISOString().slice(0, 10),
        purchased,
        sold,
      };
    });
    setTrendData(data);
  }, [product, variant]);

  if (!product) return null; // loading

  // pull overall with fallback
  const overall = product.overall ?? {
    currentStock: product.currentStock,
    salesPercent: product.salesPercent,
    percentInStock: product.percentInStock,
  };

  // variants list
  const variants = product.variants || [];

  // pick details for selected variant or fallback
  const variantData =
    variant === "All" ? overall : product.variantsData?.[variant] || {};

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-5xl w-full relative">
        {/* Close button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>

        {/* Trend Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="purchased"
                name="Purchased"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="sold"
                name="Sold"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Variant Selector & Room Temp */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="form-control w-full md:w-1/3">
            <label className="label">
              <span className="label-text">Select Variant</span>
            </label>
            <select
              className="select select-bordered"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            >
              <option>All</option>
              {variants.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
          {product.roomTemp != null && (
            <div className="bg-base-200 rounded-lg p-4 flex-1">
              <p className="font-medium">Room Temperature</p>
              <p className="text-xl">{product.roomTemp}°C</p>
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[
            ["Category", product.category],
            [
              "Current Stock",
              `${variantData.currentStock ?? overall.currentStock} units`,
            ],
            ["In-Stock %", `${overall.percentInStock}%`],
            ["Sales %", `${variantData.salesPercent ?? overall.salesPercent}%`],
            ["Expiry Date", product.expiryDate],
            ["Manufactured", product.mfgDate],
            ["Stacks", product.stacks],
            ["Batch No", product.batchNo],
            ["Selected Variant", variant],
          ].map(([label, value]) => (
            <p key={label}>
              <strong>{label}:</strong> {value ?? "—"}
            </p>
          ))}
        </div>

        {/* Close button */}
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
