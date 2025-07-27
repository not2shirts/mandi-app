
GroupBuysPage.jsx


// src/pages/GroupBuysPage.jsx
import React, { useEffect, useState } from 'react';
import { groupBuyService, handleApiError } from '../api/services';
import { FaUsers, FaClock, FaCheckCircle, FaShoppingCart, FaLeaf } from 'react-icons/fa';

export default function GroupBuysPage() {
  const [groupOrders, setGroupOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroupOrders = async () => {
      try {
        const response = await groupBuyService.getGroupBuyOpportunities();
        setGroupOrders(response.data);
      } catch (err) {
        console.error('Error fetching group buy opportunities:', err);
        setError(handleApiError(err, 'Failed to fetch group buy opportunities.'));
      } finally {
        setLoading(false);
      }
    };

    fetchGroupOrders();
  }, []);

  // Mock product images for common vegetables/ingredients
  const getProductImage = (productName) => {
    const imageMap = {
      'Tomatoes': 'https://images.unsplash.com/photo-1546470427-b1d7edea5e0b?w=400&h=300&fit=crop',
      'Onions': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
      'Potatoes': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
      'Carrots': 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&h=300&fit=crop',
      'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
      'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      'Oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop',
      'Spices': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop'
    };
    return imageMap[productName] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Group Buying Opportunities</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join group orders with other vendors to unlock wholesale pricing and reduce costs.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading group buying opportunities...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupOrders.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={item.imageUrl || getProductImage(item.name)}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${
                    item.groupBuyAchieved 
                      ? 'bg-red-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {item.groupBuyAchieved ? (
                      <><FaCheckCircle className="inline mr-1" /> Achieved</>
                    ) : (
                      <><FaClock className="inline mr-1" /> Open</>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    <FaUsers className="inline mr-1" /> Group Buy
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name || 'Product Name'}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{item.description || 'Fresh quality product'}</p>
                  
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Supplier:</span>
                      <span className="font-semibold">{item.supplierName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Origin:</span>
                      <span className="font-semibold">{item.origin || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality Grade:</span>
                      <span className="font-semibold">{item.qualityGrade || 'A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available:</span>
                      <span className="font-semibold">{item.availableQuantity || 0} {item.unit || 'kg'}</span>
                    </div>
                  </div>
                  
                  {/* Pricing */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Individual Price:</span>
                      <span className="font-bold text-orange-600 text-lg">₹{item.individualPrice || 0}/{item.unit || 'kg'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Group Buy Price:</span>
                      <span className="font-bold text-green-600 text-lg">₹{item.groupBuyPrice || 0}/{item.unit || 'kg'}</span>
                    </div>
                  </div>
                  
                  {/* Group Buy Progress */}
                  {item.groupBuyThreshold  (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Group Buy Progress</span>
                        <span>{item.groupBuyProgressPercentage || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all" 
                          style={{ width: `${item.groupBuyProgressPercentage || 0}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{item.currentGroupQuantity || 0} {item.unit || 'kg'} joined</span>
                        <span>{item.groupBuyThreshold} {item.unit || 'kg'} needed</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="px-6 pb-6">
                  {item.status === 'Open' ? (
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center justify-center">
                      <FaShoppingCart className="mr-2" />
                      Join Group Buy
                    </button>
                  ) : (
                    <button className="w-full bg-gray-400 text-gray-100 font-bold py-3 px-4 rounded-lg cursor-not-allowed flex items-center justify-center" disabled>
                      <FaCheckCircle className="mr-2" />
                      Group Buy Closed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {!loading && !error && groupOrders.length === 0 && (
          <div className="text-center py-12">
            <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Group Buys Available</h3>
            <p className="text-gray-500">Check back later for new group buying opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
}
