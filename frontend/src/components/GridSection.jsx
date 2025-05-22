// src/components/GridSection.jsx
import { useState, useEffect } from "react";
import ProductDetailModal from "./ProductDetailModal";

export default function GridSection() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  // ① Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(stored);
  }, []);

  // ② Helper to pick bg color by stock%
  const bgFor = (p) =>
    p >= 75
      ? "bg-green-300"
      : p >= 50
      ? "bg-yellow-300"
      : p >= 25
      ? "bg-amber-300"
      : "bg-red-300";

  return (
    <div className="px-6 mb-6">
      <div className="card bg-base-100 shadow-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {products.map((prod) => {
            // you may store percentInStock either on prod.overall or prod directly
            const pct =
              prod.overall?.percentInStock ?? prod.percentInStock ?? 0;

            return (
              <div
                key={prod.id}
                className={`
                  rounded-lg p-4 cursor-pointer
                  ${bgFor(pct)} hover:brightness-90 transition
                `}
                onClick={() => setSelected(prod)}
              >
                <h3 className="font-semibold">{prod.name}</h3>
                <p className="text-sm italic">{prod.type}</p>
                <div className="mt-2 text-right">
                  <span className="text-xl font-bold">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ③ Show modal when a product is selected */}
      {selected && (
        <ProductDetailModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
