import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../utils/storage";

export default function StockBlocks() {
  const [products, setProducts] = useState([]);
  useEffect(() => setProducts(getProducts()), []);

  const bgFor = (p) => {
    if (p >= 75) return "bg-green-300";
    if (p >= 50) return "bg-yellow-300";
    if (p >= 25) return "bg-amber-300";
    return "bg-red-300";
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stock Blocks</h1>
        <Link to="/add" className="btn btn-secondary">
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <Link key={prod.id} to={`/product/${prod.id}`}>
            <div
              className={`rounded-lg p-5 shadow hover:shadow-lg transition ${bgFor(
                prod.percentInStock
              )}`}
            >
              <h2 className="text-xl font-semibold mb-1">{prod.name}</h2>
              <p className="italic text-sm mb-4">{prod.type}</p>
              <div className="text-right">
                <span className="text-4xl font-bold">
                  {prod.percentInStock}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
