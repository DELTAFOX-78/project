import React from "react";
import { Bell, Search, Settings, Menu } from "lucide-react";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
  setAddProduct: (value: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  toggleSidebar,
  setAddProduct,
}) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              className="p-2 rounded-md text-gray-400 lg:hidden"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <div className="ml-2 lg:ml-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">
                Invetri
              </span>
              <span className="text-xl font-bold text-gray-900">X</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div
              onClick={() => setAddProduct(true)}
              className="cursor-pointer hover:text-indigo-500 font-semibold border-[1px] border-gray-300 rounded-md px-4 py-2 flex items-center"
            >
              Add Products
            </div>

            <div className="ml-3  relative">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
                  S
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  Staff
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
