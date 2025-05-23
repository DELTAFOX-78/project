import React from 'react';
import { Package } from 'lucide-react';
import { products } from '../../data/mockData';

interface SupplierProducts {
  [key: string]: {
    products: typeof products;
    totalProducts: number;
    totalValue: number;
  };
}

const SuppliersPage: React.FC = () => {
  const supplierData = products.reduce<SupplierProducts>((acc, product) => {
    if (!acc[product.supplier]) {
      acc[product.supplier] = {
        products: [],
        totalProducts: 0,
        totalValue: 0,
      };
    }
    acc[product.supplier].products.push(product);
    acc[product.supplier].totalProducts += product.quantity;
    acc[product.supplier].totalValue += product.price * product.quantity;
    return acc;
  }, {});

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Suppliers</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(supplierData).map(([supplier, data]) => (
            <div key={supplier} className="bg-white rounded-xl shadow-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{supplier}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {data.products.length} products · ${data.totalValue.toFixed(2)} total value
                  </p>
                </div>
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Package size={24} className="text-primary-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {data.products.map((product) => (
                  <div key={product.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={product.productImage} 
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.type}</p>
                      <p className="text-sm font-medium text-primary-600 mt-1">
                        {product.quantity} in stock
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuppliersPage;