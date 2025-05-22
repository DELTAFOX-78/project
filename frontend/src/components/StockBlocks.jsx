// src/pages/StockBlocks.jsx
import React, { useState, useEffect } from "react";
import ProductDetailModal from "../components/ProductDetailModal";
import { getProducts } from "../utils/storage";

export default function StockBlocks() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // dynamic background based on in-stock %
  const bgFor = (p) =>
    p >= 75
      ? "bg-green-300"
      : p >= 50
      ? "bg-yellow-300"
      : p >= 25
      ? "bg-amber-300"
      : "bg-red-300";

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stock Blocks</h1>
      </div>

      {/* Blocks Grid */}
      <div className="card bg-base-100 shadow-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod) => {
            const pct =
              prod.overall?.percentInStock ?? prod.percentInStock ?? 0;
            return (
              <div
                key={prod.id}
                onClick={() => setSelected(prod)}
                className={`
                  rounded-lg p-5 cursor-pointer
                  ${bgFor(pct)} shadow hover:shadow-xl transition
                `}
              >
                <h2 className="text-xl font-semibold mb-1">{prod.name}</h2>
                <p className="italic text-sm mb-4">{prod.type}</p>
                <div className="text-right">
                  <span className="text-4xl font-bold">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <ProductDetailModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
