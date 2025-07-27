import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Truck, 
  Package, 
  ClipboardList, 
  Route, 
  MessageCircle, 
  User, 
  LogOut, 
  Menu, 
  X,
  TrendingUp,
  DollarSign,
  Clock,
  Bell,
  AlertTriangle,
  CheckCircle,
  ShoppingBag,
  MapPin
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export function SupplierDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/supplier/dashboard', 
      icon: Truck,
      description: 'Overview and analytics'
    },
    { 
      name: 'Products & Pricing', 
      path: '/supplier/products', 
      icon: Package,
      description: 'Manage your inventory'
    },
    { 
      name: 'Order Dashboard', 
      path: '/supplier/orders', 
      icon: ClipboardList,
      description: 'Manage incoming orders'
    },
    { 
      name: 'Route Planning', 
      path: '/supplier/routes', 
      icon: Route,
      description: 'Optimize deliveries'
    },
    { 
      name: 'Complaints & Queries', 
      path: '/supplier/complaints', 
      icon: MessageCircle,
      description: 'Customer support'
    },
    { 
      name: 'Profile & Settings', 
      path: '/supplier/profile', 
      icon: User,
      description: 'Manage account'
    }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  // Mock data for dashboard
  const dashboardStats = {
    ordersToday: 24,
    productsListed: 156,
    pendingComplaints: 3,
    totalRevenue: 125000,
    completedDeliveries: 18,
    pendingOrders: 12
  };

  const recentOrders = [
    { 
      id: 'ORD001', 
      vendor: 'Rajesh Food Cart', 
      product: 'Organic Tomatoes', 
      quantity: '50kg', 
      amount: 2500, 
      status: 'Pending', 
      type: 'individual',
      date: '2024-01-15',
      deliveryDate: '2024-01-17'
    },
    { 
      id: 'GRP002', 
      vendor: 'Group Order (8 vendors)', 
      product: 'Fresh Onions', 
      quantity: '200kg', 
      amount: 8000, 
      status: 'Packed', 
      type: 'group',
      date: '2024-01-14',
      deliveryDate: '2024-01-16'
    },
    { 
      id: 'ORD003', 
      vendor: 'Priya Snacks Corner', 
      product: 'Green Peppers', 
      quantity: '30kg', 
      amount: 1800, 
      status: 'Dispatched', 
      type: 'individual',
      date: '2024-01-14',
      deliveryDate: '2024-01-16'
    },
    { 
      id: 'ORD004', 
      vendor: 'Mumbai Street Foods', 
      product: 'Ginger', 
      quantity: '25kg', 
      amount: 1250, 
      status: 'Delivered', 
      type: 'individual',
      date: '2024-01-13',
      deliveryDate: '2024-01-15'
    }
  ];

  const upcomingDeliveries = [
    { id: 'DEL001', location: 'Andheri West', orders: 5, time: '09:00 AM', status: 'scheduled' },
    { id: 'DEL002', location: 'Bandra East', orders: 3, time: '11:30 AM', status: 'scheduled' },
    { id: 'DEL003', location: 'Borivali', orders: 2, time: '02:00 PM', status: 'in-transit' },
    { id: 'DEL004', location: 'Thane', orders: 4, time: '04:30 PM', status: 'scheduled' }
  ];

  const recentComplaints = [
    { id: 'CMP001', vendor: 'Rajesh Food Cart', issue: 'Product quality concern', status: 'open', time: '2 hours ago' },
    { id: 'CMP002', vendor: 'Priya Snacks', issue: 'Delivery delay', status: 'in-progress', time: '5 hours ago' },
    { id: 'CMP003', vendor: 'Mumbai Foods', issue: 'Wrong quantity received', status: 'resolved', time: '1 day ago' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Apna Mandi</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Fresh Farms Ltd</h3>
              <p className="text-sm text-gray-600">Supplier Account</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-3 text-gray-700 hover:text-red-600 hover:border-red-300"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Supplier Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Fresh Farms!</h2>
            <p className="text-gray-600">Here's your business overview for today.</p>
          </div>

          {/* Daily Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Orders Today</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.ordersToday}</p>
                  <p className="text-sm text-green-600 mt-1">+12% from yesterday</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Products Listed</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.productsListed}</p>
                  <p className="text-sm text-blue-600 mt-1">85% in stock</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Complaints</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.pendingComplaints}</p>
                  <p className="text-sm text-orange-600 mt-1">2 require urgent attention</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">₹{dashboardStats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed Deliveries</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.completedDeliveries}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Link 
                  to="/supplier/orders"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{order.id}</p>
                        {order.type === 'group' && (
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            Group Order
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{order.vendor}</p>
                      <p className="text-sm text-gray-500">{order.product} - {order.quantity}</p>
                      <p className="text-xs text-gray-400">Delivery: {order.deliveryDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{order.amount}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Dispatched' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Packed' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deliveries */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Today's Deliveries</h3>
                <Link 
                  to="/supplier/routes"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Routes
                </Link>
              </div>
              
              <div className="space-y-3">
                {upcomingDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        delivery.status === 'in-transit' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-900">{delivery.location}</span>
                        </div>
                        <p className="text-sm text-gray-500">{delivery.orders} orders • {delivery.time}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      delivery.status === 'in-transit' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {delivery.status === 'in-transit' ? 'In Transit' : 'Scheduled'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Complaints and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Complaints */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Complaints</h3>
                <Link 
                  to="/supplier/complaints"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{complaint.vendor}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        complaint.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        complaint.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {complaint.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{complaint.issue}</p>
                    <p className="text-xs text-gray-500">{complaint.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/supplier/products"
                  className="bg-green-50 border border-green-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900 text-sm">Add Product</p>
                </Link>
                
                <Link 
                  to="/supplier/orders"
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <ClipboardList className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900 text-sm">Process Orders</p>
                </Link>
                
                <Link 
                  to="/supplier/routes"
                  className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <Route className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900 text-sm">Plan Routes</p>
                </Link>
                
                <Link 
                  to="/supplier/complaints"
                  className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
                >
                  <MessageCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900 text-sm">Handle Queries</p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
