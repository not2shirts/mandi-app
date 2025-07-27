
import React, { useState } from 'react';
import { productService, handleApiError } from '../../../api/services';
import { FaSearch, FaShoppingCart, FaLeaf, FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa';





export function VendorCatalog() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await productService.searchProducts(query);
      setResults(res.data);
    } catch (err) {
      setError(handleApiError(err, 'Failed to fetch search results.'));
    } finally {
      setLoading(false);
    }
  };

  // Product image helper function
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Search Products</h1>
          <p className="text-xl text-gray-600">Find the best ingredients and suppliers for your business</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for tomatoes, onions, rice, spices..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <FaSearch className="mr-2" />
              Search
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((item) => (
              <div key={item.productId} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={item.imageUrl || getProductImage(item.name)}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    <FaLeaf className="inline mr-1" /> {item.qualityGrade || 'Premium'}
                  </div>
                  {item.groupBuyAchieved && (
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                      <FaUsers className="inline mr-1" /> Group Buy Active
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Supplier:</span>
                      <span className="font-semibold">{item.supplierName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Origin:</span>
                      <span className="font-semibold">{item.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-semibold">{item.availableQuantity} {item.unit}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Individual Price:</span>
                      <span className="font-bold text-orange-600 text-lg">₹{item.individualPrice}/{item.unit}</span>
                    </div>
                    {item.groupBuyPrice && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Group Buy Price:</span>
                        <span className="font-bold text-green-600 text-lg">₹{item.groupBuyPrice}/{item.unit}</span>
                      </div>
                    )}
                  </div>

                  {/* Group Buy Progress */}
                  {item.groupBuyThreshold && (
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
                        <span>{item.currentGroupQuantity || 0}kg joined</span>
                        <span>{item.groupBuyThreshold}kg needed</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center justify-center">
                      <FaShoppingCart className="mr-2" />
                      Order Now
                    </button>
                    {item.groupBuyThreshold && !item.groupBuyAchieved && (
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center justify-center">
                        <FaUsers className="mr-2" />
                        Join Group
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && results.length === 0 && query && (
          <div className="text-center py-12">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try searching with different keywords or check your spelling.</p>
          </div>
        )}
      </div>
    </div>
  );
}
