import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { clearTokens } from "../services/api";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  const [isStaff, setIsStaff] = useState(localStorage.getItem("role") === "staff");
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
      setIsStaff(localStorage.getItem("role") === "staff");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    clearTokens();
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setIsStaff(false);
    navigate("/login");
  };

  return (
    <nav className="bg-ecoDark/80 backdrop-blur-lg border-b border-ecoGreen/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-ecoGreen">
          EcoAI
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-ecoGreen">Home</Link>
          <Link to="/chatbot" className="hover:text-ecoGreen">Chatbot</Link>
          <Link to="/live-map" className="hover:text-ecoGreen">Trucks</Link>
          {isStaff && (
            <Link to="/staff/dashboard" className="hover:text-ecoGreen">
              Staff Portal
            </Link>
          )}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-ecoGreen">Login</Link>
              <Link to="/signup" className="hover:text-ecoGreen">Signup</Link>
              <Link to="/staff-login" className="hover:text-ecoGreen">Staff</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
