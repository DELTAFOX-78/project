import React from "react";
import { getStatusColor } from "../../utils/helpers";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { name, type, quantity, rackNo, status, productImage } = product;

  return (
    <div
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover cursor-pointer transition-all duration-300 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={productImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">{type}</p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Quantity:</span>
            <span className="ml-1 font-medium text-gray-900">{quantity}</span>
          </div>
          <div>
            <span className="text-gray-500">Rack:</span>
            <span className="ml-1 font-medium text-gray-900">{rackNo}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <button
          className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
