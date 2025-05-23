import React from "react";
import {
  X,
  Calendar,
  Thermometer,
  Package,
  Clock,
  Truck,
  Tag,
} from "lucide-react";
import { Product } from "../../types";
import { formatDate } from "../../utils/helpers";
import InventoryLineChart from "../Charts/InventoryLineChart";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const {
    name,
    type,
    quantity,
    expiryDate,
    mfgDate,
    rackNo,
    roomTemp,
    batchNo,
    createdAt,
    productImage,
    price,
    supplier,
    status,
    history,
    stockHistory,
  } = product;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 p-6 flex flex-col">
              <div className="flex-1 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={productImage}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                <p className="text-sm text-gray-500 mt-1">{type}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 p-2 rounded-lg">
                    <Package size={20} className="text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Quantity
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 p-2 rounded-lg">
                    <Tag size={20} className="text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Price</p>
                    <p className="text-lg font-semibold text-gray-900">
                      &#8377;{price?.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 p-2 rounded-lg">
                    <Calendar size={20} className="text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Expiry Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(expiryDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 p-2 rounded-lg">
                    <Calendar size={20} className="text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Manufacturing Date
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(mfgDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 p-2 rounded-lg">
                    <Thermometer size={20} className="text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Room Temperature
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {roomTemp}°C
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 p-2 rounded-lg">
                    <Package size={20} className="text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Rack Number
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {rackNo}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 p-2 rounded-lg">
                    <Clock size={20} className="text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Created At
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 p-2 rounded-lg">
                    <Truck size={20} className="text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">
                      Supplier
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {supplier}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Stock History Chart */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Stock History
                </h3>
                <InventoryLineChart data={stockHistory} />
              </div>

              {/* Stock history table */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Transaction History
                </h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Action
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {history?.map((record, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {formatDate(record.date)}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            <span
                              className={`inline-flex px-2 py-1 text-xs rounded-full font-medium capitalize
                              ${
                                record.action === "added"
                                  ? "bg-green-100 text-green-800"
                                  : record.action === "removed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {record.action}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {record.quantity}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">
                            {record.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
