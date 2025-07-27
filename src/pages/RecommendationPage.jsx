





import React, { useEffect, useState } from 'react';
import { recommendationService, handleApiError } from '../api/services';
import { FaTruck, FaStar, FaLeaf, FaShieldAlt, FaClock, FaPhone, FaMapMarkerAlt, FaShoppingCart, FaHeart } from 'react-icons/fa';

export default function RecommendationPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await recommendationService.getRecommendations();
        setRecommendations(res.data);
      } catch (err) {
        setError(handleApiError(err, 'Failed to load recommendations.'));
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  // Get supplier/product image helper function
  const getSupplierImage = (supplierName) => {
    const imageMap = {
      'Farm Fresh Delhi': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop',
      'Mumbai Spice Co': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop',
      'Kerala Organics': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      'Punjab Grains': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
      'Bangalore Vegetables': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop'
    };
    return imageMap[supplierName] || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop';
  };

  const getProductImage = (productName) => {
    const imageMap = {
      'Tomatoes': 'https://images.unsplash.com/photo-1546470427-b1d7edea5e0b?w=400&h=300&fit=crop',
      'Onions': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
      'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
      'Spices': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop'
    };
    return imageMap[productName] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Recommended Suppliers & Products</h1>
          <p className="text-xl text-gray-600">Discover trusted suppliers and high-quality products curated for your business</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recommendations...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Supplier Header */}
                <div className="relative">
                  <img
                    src={item.supplierImage || getSupplierImage(item.supplierName)}
                    alt={item.supplierName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center">
                      <FaTruck className="text-orange-500 mr-1" />
                      <span className="text-sm font-semibold text-gray-700">Verified</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
                    <h3 className="font-bold text-lg">{item.supplierName}</h3>
                    <div className="flex items-center mt-1">
                      {renderStars(item.rating || 4)}
                      <span className="ml-2 text-sm">({item.rating || 4.2})</span>
                    </div>
                  </div>
                </div>

                {/* Product Section */}
                <div className="p-6">
                  {/* Featured Product */}
                  <div className="flex items-center mb-4">
                    <img
                      src={item.productImage || getProductImage(item.name)}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                      <p className="text-gray-600 text-sm">{item.category}</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 transition-colors">
                      <FaHeart />
                    </button>
                  </div>

                  {/* Supplier Details */}
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-orange-500" />
                      <span>{item.location || 'Delhi, India'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaPhone className="mr-2 text-orange-500" />
                      <span>{item.phone || '+91 98765 43210'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-2 text-orange-500" />
                      <span>Delivery: {item.deliveryTime || '2-3 days'}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <FaLeaf className="mr-1" /> Organic
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <FaShieldAlt className="mr-1" /> Certified
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Premium Quality
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Individual Price:</span>
                      <span className="font-bold text-orange-600 text-xl">₹{item.individualPrice || '50'}/{item.unit || 'kg'}</span>
                    </div>
                    {item.groupBuyPrice && (
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600 text-sm">Group Buy Price:</span>
                        <span className="text-green-600 font-semibold text-sm">₹{item.groupBuyPrice}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center justify-center">
                      <FaShoppingCart className="mr-2" />
                      Order Now
                    </button>
                    <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 font-bold rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && recommendations.length === 0 && (
          <div className="text-center py-12">
            <FaTruck className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Recommendations Available</h3>
            <p className="text-gray-500">Check back later for personalized supplier recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
}
