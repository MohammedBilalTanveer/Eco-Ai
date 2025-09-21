import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { clearTokens } from '../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));
  const [isScrolled, setIsScrolled] = useState(false);
  const [isStaff, setIsStaff] = useState(localStorage.getItem('role') === 'staff');
  const navigate = useNavigate();

  const handleLogout = () => {
    clearTokens();
    setIsLoggedIn(false);
    setIsStaff(false);
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('access_token'));
      setIsStaff(localStorage.getItem('role') === 'staff');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = (
    <>
      <Link to="/report-waste" className="hover:text-[#8245ec] transition-colors">
        Report Waste
      </Link>
      <Link to="/report-food" className="hover:text-[#8245ec] transition-colors">
        Report Food
      </Link>
      <Link to="/live-map" className="hover:text-[#8245ec] transition-colors">
        Live Map
      </Link>
      <Link to="/chatbot" className="hover:text-[#8245ec] transition-colors">
        GreenBot
      </Link>
      {isStaff && (
        <Link to="/staff/dashboard" className="hover:text-[#8245ec] transition-colors">
          Staff Portal
        </Link>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition duration-300 px-4 md:px-8 lg:px-20 ${
        isScrolled
          ? 'bg-[#050414] bg-opacity-50 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="text-white py-5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold cursor-pointer">
          <span className="text-white">Eco</span>
          <span className="text-white"> </span>
          <span className="text-[#8245ec]">AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-300">
          {isLoggedIn ? (
            <>
              {menuItems}
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/staff-login"
                className="bg-[#8245ec] px-4 py-2 rounded-lg hover:bg-opacity-80 text-white transition-colors"
              >
                Staff Login
              </Link>
              <Link to="/login" className="px-4 py-2 border border-white rounded-lg hover:border-[#8245ec] hover:text-[#8245ec] transition-colors">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-[#8245ec] px-4 py-2 rounded-lg hover:bg-opacity-80 text-white transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX
              className="text-3xl text-[#8245ec] cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FiMenu
              className="text-3xl text-[#8245ec] cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-[#050414] bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center space-y-4 text-gray-300">
            {isLoggedIn ? (
              <>
                {menuItems}
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-500 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full text-center py-2 hover:text-[#8245ec] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="w-full text-center bg-[#8245ec] py-2 rounded-lg hover:bg-opacity-80 text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
