import React from "react";
import {
  Home,
  Package,
  ShoppingCart,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onPageChange: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  onPageChange,
  currentPage,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("alertSent", "false");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  const navItems = [
    { icon: Package, label: "Inventory", id: "inventory" },
    { icon: BarChart2, label: "Reports", id: "reports" },
    { icon: Users, label: "Suppliers", id: "suppliers" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static lg:z-0
      `}
      >
        <div className="h-full flex flex-col">
          <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onPageChange(item.id);
                      if (window.innerWidth < 1024) {
                        toggleSidebar();
                      }
                    }}
                    className={`
                      w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                      ${
                        currentPage === item.id
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }
                    `}
                  >
                    <item.icon
                      size={20}
                      className={
                        currentPage === item.id
                          ? "text-primary-600"
                          : "text-gray-500"
                      }
                    />
                    <span className="ml-3">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
                  <HelpCircle size={20} className="text-gray-500" />
                  <span className="ml-3">Help & Support</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900"
                >
                  <LogOut size={20} className="text-gray-500" />
                  <span className="ml-3">Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
