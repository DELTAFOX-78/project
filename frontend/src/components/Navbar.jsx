import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    setIsAuth(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 px-6 shadow-md">
      <div className="flex-1">
        <Link
          to={isAuth ? "/dashboard" : "/login"}
          className="text-xl font-bold"
        >
          🏭 SmartWarehouse
        </Link>
      </div>

      <div className="hidden md:flex space-x-4">
        {isAuth ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-base-200 ${
                  isActive ? "bg-base-200 font-semibold" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/blocks"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-base-200 ${
                  isActive ? "bg-base-200 font-semibold" : ""
                }`
              }
            >
              Stock Blocks
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-base-200 ${
                  isActive ? "bg-base-200 font-semibold" : ""
                }`
              }
            >
              Add Product
            </NavLink>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded hover:bg-base-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-base-200 ${
                  isActive ? "bg-base-200 font-semibold" : ""
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-3 py-2 rounded hover:bg-base-200 ${
                  isActive ? "bg-base-200 font-semibold" : ""
                }`
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>

      {/* mobile menu omitted for brevity; same conditional blocks apply */}

      <div className="flex-none ml-2">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
}
