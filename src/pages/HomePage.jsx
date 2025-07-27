




// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaShoppingBag, FaTruck, FaClipboardList, FaUser, FaArrowRight, FaStar, FaLeaf, FaShieldAlt, FaClock } from 'react-icons/fa';

export default function HomePage() {
  const stats = [
    { number: '5000+', label: 'Active Vendors', icon: FaUsers },
    { number: '15000+', label: 'Orders Delivered', icon: FaShoppingBag },
    { number: '300+', label: 'Trusted Suppliers', icon: FaTruck },
    { number: '4.8/5', label: 'Customer Rating', icon: FaStar }
  ];

  const features = [
    { icon: FaLeaf, title: 'Fresh Quality', desc: 'Farm-fresh ingredients delivered daily' },
    { icon: FaShieldAlt, title: 'Trusted Partners', desc: 'Verified suppliers with quality assurance' },
    { icon: FaClock, title: 'Quick Delivery', desc: 'Same-day delivery for urgent orders' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">Street Eats</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Empowering India's street food vendors with premium ingredients, 
            trusted suppliers, and smart ordering solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/individual-orders" 
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105 flex items-center justify-center"
            >
              Start Ordering <FaArrowRight className="ml-2" />
            </Link>
            <Link 
              to="/group-buys" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-500 text-white font-bold px-8 py-4 rounded-full transition-all"
            >
              Join Group Buys
            </Link>
          </div>
        </div>
        
        {/* Hero Images */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop&crop=center" 
            alt="Fresh vegetables"
            className="w-80 h-80 object-cover rounded-full"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <IconComponent className="text-orange-500 text-4xl mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Street Eats?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                  <IconComponent className="text-orange-500 text-5xl mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Get Started</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link 
              to="/group-buys" 
              className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <FaUsers className="text-blue-500 text-4xl mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Group Buys</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Join group orders to get better prices on bulk supplies and ingredients.
              </p>
              <div className="flex items-center text-blue-500 font-semibold">
                Explore Now <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link 
              to="/individual-orders" 
              className="group bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <FaShoppingBag className="text-green-500 text-4xl mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Quick Orders</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Place individual orders for your daily business needs and ingredients.
              </p>
              <div className="flex items-center text-green-500 font-semibold">
                Order Now <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link 
              to="/recommendations" 
              className="group bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <FaTruck className="text-purple-500 text-4xl mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Find Suppliers</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Browse and connect with trusted suppliers for quality ingredients.
              </p>
              <div className="flex items-center text-purple-500 font-semibold">
                Browse Suppliers <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link 
              to="/my-orders" 
              className="group bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <FaClipboardList className="text-orange-500 text-4xl mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Track Orders</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Monitor all your current and past orders in one convenient place.
              </p>
              <div className="flex items-center text-orange-500 font-semibold">
                View Orders <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>

            <Link 
              to="/profile" 
              className="group bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <FaUser className="text-red-500 text-4xl mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">My Profile</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Manage your vendor profile, preferences, and payment methods.
              </p>
              <div className="flex items-center text-red-500 font-semibold">
                Manage Profile <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Street Food Business?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of vendors who trust Street Eats for their supply needs.
          </p>
          <Link 
            to="/individual-orders" 
            className="bg-white hover:bg-gray-100 text-orange-500 font-bold px-10 py-4 rounded-full transition-all transform hover:scale-105 inline-flex items-center text-lg"
          >
            Get Started Today <FaArrowRight className="ml-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
