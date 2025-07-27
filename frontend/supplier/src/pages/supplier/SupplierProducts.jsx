import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Save, 
  X, 
  Upload,
  Download,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  MoreVertical
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export function SupplierProducts() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    unit: 'kg',
    quantity: '',
    deliveryTime: '2-3 days',
    description: ''
  });

  // Mock product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      price: 50,
      unit: 'kg',
      quantity: 500,
      deliveryTime: '2-3 days',
      status: 'available',
      description: 'Fresh organic tomatoes from certified farms',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Fresh Onions',
      category: 'Vegetables',
      price: 30,
      unit: 'kg',
      quantity: 800,
      deliveryTime: '1-2 days',
      status: 'available',
      description: 'Premium quality onions, sorted and cleaned',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      name: 'Green Peppers',
      category: 'Vegetables',
      price: 60,
      unit: 'kg',
      quantity: 0,
      deliveryTime: '2-3 days',
      status: 'out-of-stock',
      description: 'Fresh green bell peppers',
      lastUpdated: '2024-01-13'
    },
    {
      id: 4,
      name: 'Basmati Rice',
      category: 'Grains',
      price: 80,
      unit: 'kg',
      quantity: 1000,
      deliveryTime: '3-4 days',
      status: 'available',
      description: 'Premium basmati rice, aged for 2 years',
      lastUpdated: '2024-01-12'
    },
    {
      id: 5,
      name: 'Turmeric Powder',
      category: 'Spices',
      price: 120,
      unit: 'kg',
      quantity: 50,
      deliveryTime: '1-2 days',
      status: 'low-stock',
      description: 'Pure turmeric powder, ground fresh',
      lastUpdated: '2024-01-11'
    }
  ]);

  const categories = ['all', 'Vegetables', 'Fruits', 'Grains', 'Spices', 'Dairy', 'Oil & Ghee'];
  const units = ['kg', 'gram', 'litre', 'piece', 'dozen', 'quintal'];
  const deliveryOptions = ['1-2 days', '2-3 days', '3-4 days', '5-7 days'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveProduct = () => {
    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { ...editingProduct, lastUpdated: new Date().toISOString().split('T')[0] }
        : p
    ));
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
      status: Number(newProduct.quantity) > 0 ? 'available' : 'out-of-stock',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      unit: 'kg',
      quantity: '',
      deliveryTime: '2-3 days',
      description: ''
    });
    setShowAddModal(false);
  };

  const toggleProductStatus = (productId) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { 
            ...p, 
            status: p.status === 'available' ? 'unavailable' : 'available',
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : p
    ));
  };

  const getStatusBadge = (status, quantity) => {
    if (status === 'unavailable') {
      return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Unavailable</span>;
    } else if (quantity === 0) {
      return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Out of Stock</span>;
    } else if (quantity < 100) {
      return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Low Stock</span>;
    } else {
      return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Available</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/supplier/dashboard')}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Product & Price Management</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
              <option value="unavailable">Unavailable</option>
            </select>

            {/* Bulk Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4">
                      {editingProduct && editingProduct.id === product.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">₹</span>
                          <input
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({
                              ...editingProduct,
                              price: Number(e.target.value)
                            })}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <span className="text-sm">/{product.unit}</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-900">
                          ₹{product.price}/{product.unit}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingProduct && editingProduct.id === product.id ? (
                        <input
                          type="number"
                          value={editingProduct.quantity}
                          onChange={(e) => setEditingProduct({
                            ...editingProduct,
                            quantity: Number(e.target.value)
                          })}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {product.quantity} {product.unit}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(product.status, product.quantity)}
                        <button
                          onClick={() => toggleProductStatus(product.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {product.status === 'available' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {editingProduct && editingProduct.id === product.id ? (
                        <select
                          value={editingProduct.deliveryTime}
                          onChange={(e) => setEditingProduct({
                            ...editingProduct,
                            deliveryTime: e.target.value
                          })}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          {deliveryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-sm text-gray-900">{product.deliveryTime}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {editingProduct && editingProduct.id === product.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={handleSaveProduct}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingProduct(null)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddModal(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Product</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit *
                      </label>
                      <select
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity Available *
                      </label>
                      <input
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Time *
                      </label>
                      <select
                        value={newProduct.deliveryTime}
                        onChange={(e) => setNewProduct({ ...newProduct, deliveryTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {deliveryOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Product description..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddProduct}
                  disabled={!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.quantity}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
