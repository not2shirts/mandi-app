import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Eye, 
  Users, 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Package,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  CheckCircle,
  Clock,
  Truck,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export function SupplierOrders() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      type: 'individual',
      vendor: {
        name: 'Rajesh Food Cart',
        owner: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        email: 'rajesh@foodcart.com',
        address: 'Shop 15, Food Street, Andheri West, Mumbai - 400058'
      },
      products: [
        { name: 'Organic Tomatoes', quantity: 50, unit: 'kg', price: 50, total: 2500 }
      ],
      totalAmount: 2500,
      deliveryDate: '2024-01-17',
      orderDate: '2024-01-15',
      status: 'pending',
      priority: 'normal',
      notes: 'Please ensure fresh quality tomatoes'
    },
    {
      id: 'GRP002',
      type: 'group',
      vendor: {
        name: 'Group Order - 8 Vendors',
        groupDetails: [
          { name: 'Rajesh Food Cart', quantity: '25kg' },
          { name: 'Priya Snacks', quantity: '20kg' },
          { name: 'Mumbai Eats', quantity: '30kg' },
          { name: 'Street Food Hub', quantity: '15kg' }
        ],
        coordinator: 'Amit Sharma',
        phone: '+91 87654 32109',
        email: 'group@vendors.com',
        address: 'Multiple locations in Andheri area'
      },
      products: [
        { name: 'Fresh Onions', quantity: 200, unit: 'kg', price: 30, total: 6000 },
        { name: 'Potatoes', quantity: 100, unit: 'kg', price: 25, total: 2500 }
      ],
      totalAmount: 8500,
      deliveryDate: '2024-01-16',
      orderDate: '2024-01-14',
      status: 'packed',
      priority: 'high',
      notes: 'Group order - coordinate with Amit for delivery points'
    },
    {
      id: 'ORD003',
      type: 'individual',
      vendor: {
        name: 'Priya Snacks Corner',
        owner: 'Priya Patel',
        phone: '+91 76543 21098',
        email: 'priya@snacks.com',
        address: 'Corner Shop, Market Road, Bandra East, Mumbai - 400051'
      },
      products: [
        { name: 'Green Peppers', quantity: 30, unit: 'kg', price: 60, total: 1800 }
      ],
      totalAmount: 1800,
      deliveryDate: '2024-01-16',
      orderDate: '2024-01-14',
      status: 'dispatched',
      priority: 'normal',
      notes: ''
    },
    {
      id: 'ORD004',
      type: 'individual',
      vendor: {
        name: 'Mumbai Street Foods',
        owner: 'Suresh Gupta',
        phone: '+91 65432 10987',
        email: 'suresh@mumbaistreet.com',
        address: 'Stall 8, Station Road, Borivali West, Mumbai - 400092'
      },
      products: [
        { name: 'Ginger', quantity: 25, unit: 'kg', price: 50, total: 1250 }
      ],
      totalAmount: 1250,
      deliveryDate: '2024-01-15',
      orderDate: '2024-01-13',
      status: 'delivered',
      priority: 'normal',
      notes: 'Delivered on time'
    },
    {
      id: 'ORD005',
      type: 'individual',
      vendor: {
        name: 'Delhi Delights',
        owner: 'Ramesh Singh',
        phone: '+91 54321 09876',
        email: 'ramesh@delhidelights.com',
        address: 'Shop 25, Commercial Complex, Thane - 400601'
      },
      products: [
        { name: 'Basmati Rice', quantity: 100, unit: 'kg', price: 80, total: 8000 },
        { name: 'Turmeric Powder', quantity: 10, unit: 'kg', price: 120, total: 1200 }
      ],
      totalAmount: 9200,
      deliveryDate: '2024-01-18',
      orderDate: '2024-01-15',
      status: 'confirmed',
      priority: 'high',
      notes: 'Large order - arrange for bigger vehicle'
    }
  ]);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'packed', label: 'Packed' },
    { value: 'dispatched', label: 'Dispatched' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesType = selectedType === 'all' || order.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle },
      packed: { bg: 'bg-purple-100', text: 'text-purple-800', icon: Package },
      dispatched: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: Truck },
      delivered: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { bg: 'bg-red-100', text: 'text-red-800' },
      normal: { bg: 'bg-gray-100', text: 'text-gray-800' },
      low: { bg: 'bg-green-100', text: 'text-green-800' }
    };

    const config = priorityConfig[priority] || priorityConfig.normal;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
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
              <h1 className="text-2xl font-bold text-gray-900">Order Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 text-sm rounded ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-3 py-1 text-sm rounded ${viewMode === 'card' ? 'bg-white shadow-sm' : ''}`}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders by ID or vendor name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="individual">Individual Orders</option>
              <option value="group">Group Orders</option>
            </select>
          </div>
        </div>

        {/* Orders Display */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <>
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{order.id}</span>
                                {order.type === 'group' && (
                                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                    <Users className="w-3 h-3 inline mr-1" />
                                    Group
                                  </span>
                                )}
                                {getPriorityBadge(order.priority)}
                              </div>
                              <div className="text-sm text-gray-500">
                                Ordered: {order.orderDate}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{order.vendor.name}</div>
                            {order.type === 'individual' && (
                              <>
                                <div className="text-sm text-gray-500">{order.vendor.owner}</div>
                                <div className="text-sm text-gray-500">{order.vendor.phone}</div>
                              </>
                            )}
                            {order.type === 'group' && (
                              <div className="text-sm text-gray-500">
                                Coordinator: {order.vendor.coordinator}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {order.products.map((product, index) => (
                              <div key={index}>
                                {product.name} ({product.quantity} {product.unit})
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            ₹{order.totalAmount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {order.deliveryDate}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="packed">Packed</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            {expandedOrder === order.id ? 'Hide' : 'View'}
                          </Button>
                        </td>
                      </tr>
                      
                      {/* Expanded Row */}
                      {expandedOrder === order.id && (
                        <tr>
                          <td colSpan="7" className="px-6 py-4 bg-gray-50">
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Vendor Details */}
                                <div className="bg-white p-4 rounded-lg">
                                  <h4 className="font-medium text-gray-900 mb-3">Vendor Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                      <User className="w-4 h-4 text-gray-400" />
                                      <span>{order.vendor.name}</span>
                                    </div>
                                    {order.vendor.owner && (
                                      <div className="flex items-center gap-2">
                                        <span className="w-4 h-4" />
                                        <span>Owner: {order.vendor.owner}</span>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-4 h-4 text-gray-400" />
                                      <span>{order.vendor.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-4 h-4 text-gray-400" />
                                      <span>{order.vendor.email}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                      <span>{order.vendor.address}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Order Details */}
                                <div className="bg-white p-4 rounded-lg">
                                  <h4 className="font-medium text-gray-900 mb-3">Order Details</h4>
                                  <div className="space-y-3">
                                    {order.products.map((product, index) => (
                                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <div>
                                          <div className="font-medium">{product.name}</div>
                                          <div className="text-sm text-gray-500">
                                            {product.quantity} {product.unit} × ₹{product.price}
                                          </div>
                                        </div>
                                        <div className="font-medium">₹{product.total}</div>
                                      </div>
                                    ))}
                                    <div className="border-t pt-2 flex justify-between items-center font-medium">
                                      <span>Total Amount:</span>
                                      <span>₹{order.totalAmount.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Group Order Details */}
                              {order.type === 'group' && order.vendor.groupDetails && (
                                <div className="bg-white p-4 rounded-lg">
                                  <h4 className="font-medium text-gray-900 mb-3">Group Order Participants</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {order.vendor.groupDetails.map((vendor, index) => (
                                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <span className="font-medium">{vendor.name}</span>
                                        <span className="text-sm text-gray-600">{vendor.quantity}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Notes */}
                              {order.notes && (
                                <div className="bg-white p-4 rounded-lg">
                                  <h4 className="font-medium text-gray-900 mb-2">Order Notes</h4>
                                  <p className="text-sm text-gray-600">{order.notes}</p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No orders found matching your criteria.</p>
              </div>
            )}
          </div>
        ) : (
          /* Card View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{order.id}</h3>
                      {order.type === 'group' && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          <Users className="w-3 h-3 inline mr-1" />
                          Group
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{order.vendor.name}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(order.status)}
                    {getPriorityBadge(order.priority)}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="font-medium">₹{order.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Delivery:</span>
                    <span className="text-sm">{order.deliveryDate}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Products:</span>
                    <div className="mt-1">
                      {order.products.map((product, index) => (
                        <div key={index} className="text-sm text-gray-900">
                          {product.name} ({product.quantity} {product.unit})
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="packed">Packed</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
