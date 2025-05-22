import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getProducts } from "../utils/storage";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prod, setProd] = useState(null);

  useEffect(() => {
    const found = getProducts().find((p) => p.id === id);
    setProd(found || undefined);
  }, [id]);

  if (prod === undefined) {
    return <h2 className="p-6 text-center">Product not found</h2>;
  }
  if (!prod) return null; // still loading

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <button onClick={() => navigate(-1)} className="btn btn-ghost mb-4">
        ← Back
      </button>
      <div className="card bg-base-100 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{prod.name}</h2>

        {/* Trend Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={prod.trend}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="purchased"
                name="Purchased"
                stroke="#3b82f6"
              />
              <Line
                type="monotone"
                dataKey="sold"
                name="Sold"
                stroke="#ef4444"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[
            ["Category", prod.type],
            ["Current Stock", `${prod.currentStock} units`],
            ["In-Stock %", `${prod.percentInStock}%`],
            ["Sales %", `${prod.salesPercent}%`],
            ["Manufactured", prod.mfgDate],
            ["Expiry Date", prod.expiryDate],
            ["Stacks", prod.stacks],
            ["Batch No", prod.batchNo],
            ["Room Temp", `${prod.roomTemp}°C`],
          ].map(([label, value]) => (
            <p key={label}>
              <strong>{label}:</strong> {value || "—"}
            </p>
          ))}
        </div>

        <div className="text-right">
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
