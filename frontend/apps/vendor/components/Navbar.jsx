



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaShoppingBag, FaSearch, FaTruck, FaClipboardList, FaUser, FaShoppingCart, FaBell, FaSignOutAlt, FaUtensils } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-red-500 shadow-lg px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaUtensils className="text-white text-2xl" />
          <Link to="/" className="text-2xl font-bold text-white hover:text-yellow-200 transition-colors">
            Street Eats
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li>
            <Link to="/group-buys" className="flex items-center space-x-2 hover:text-yellow-200 transition-colors py-2">
              <FaUsers className="text-sm" />
              <span>Group Buys</span>
            </Link>
          </li>
          <li>
            <Link to="/individual-orders" className="flex items-center space-x-2 hover:text-yellow-200 transition-colors py-2">
              <FaShoppingBag className="text-sm" />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="flex items-center space-x-2 hover:text-yellow-200 transition-colors py-2">
              <FaSearch className="text-sm" />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/recommendations" className="flex items-center space-x-2 hover:text-yellow-200 transition-colors py-2">
              <FaTruck className="text-sm" />
              <span>Suppliers</span>
            </Link>
          </li>
          <li>
            <Link to="/my-orders" className="flex items-center space-x-2 hover:text-yellow-200 transition-colors py-2">
              <FaClipboardList className="text-sm" />
              <span>My Orders</span>
            </Link>
          </li>
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <FaBell className="text-white text-lg cursor-pointer hover:text-yellow-200 transition-colors" />
          <Link to="/profile" className="flex items-center space-x-2 text-white hover:text-yellow-200 transition-colors">
            <FaUser className="text-sm" />
            <span className="hidden md:block">Profile</span>
          </Link>
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-2 bg-orange-500 bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors text-white"
          >
            <FaSignOutAlt className="text-sm" />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
