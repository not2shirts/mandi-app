import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Package,
  Users,
  ShoppingBag,
  History,
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Clock,
  Bell,
  MenuIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export function VendorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
     {
      name: 'Recommendations',
      path: '/vendor/recommendations',
      icon: MenuIcon,
      description: 'Recommended Suppliers for you'
    },
    {
      name: 'Dashboard',
      path: '/vendor/dashboard',
      icon: ShoppingCart,
      description: 'Overview and analytics'
    },
    {
      name: 'Product Catalog',
      path: '/vendor/catalog',
      icon: Package,
      description: 'Browse supplier products'
    },
    {
      name: 'Group Orders',
      path: '/vendor/group-orders',
      icon: Users,
      description: 'Join group buying'
    },
    {
      name: 'Individual Orders',
      path: '/vendor/individual-orders',
      icon: ShoppingBag,
      description: 'Place direct orders'
    },
    {
      name: 'Order History',
      path: '/vendor/order-history',
      icon: History,
      description: 'Track your orders'
    },
    {
      name: 'Profile',
      path: '/vendor/profile',
      icon: User,
      description: 'Manage account'
    }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  // Mock data for dashboard
  const dashboardStats = {
    totalOrders: 156,
    activeOrders: 8,
    totalSpent: 89500,
    savedAmount: 12800
  };

  const recentOrders = [
    { id: 'ORD001', supplier: 'Fresh Farms Ltd', amount: 2500, status: 'Delivered', date: '2024-01-15' },
    { id: 'ORD002', supplier: 'Green Valley Suppliers', amount: 1800, status: 'In Transit', date: '2024-01-14' },
    { id: 'ORD003', supplier: 'Organic Harvest Co', amount: 3200, status: 'Processing', date: '2024-01-13' },
    { id: 'ORD004', supplier: 'Market Fresh', amount: 1500, status: 'Delivered', date: '2024-01-12' }
  ];

  const groupOrders = [
    { id: 'GRP001', product: 'Organic Tomatoes', quantity: '500kg', participants: 12, deadline: '2024-01-20', savings: '15%' },
    { id: 'GRP002', product: 'Fresh Onions', quantity: '800kg', participants: 8, deadline: '2024-01-22', savings: '12%' },
    { id: 'GRP003', product: 'Green Peppers', quantity: '300kg', participants: 15, deadline: '2024-01-25', savings: '18%' }
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
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
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
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Rajesh's Food Cart</h3>
              <p className="text-sm text-gray-600">Vendor Account</p>
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
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
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
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Rajesh!</h2>
            <p className="text-gray-600">Here's what's happening with your business today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardStats.activeOrders}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-gray-900">₹{dashboardStats.totalSpent.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Amount Saved</p>
                  <p className="text-3xl font-bold text-gray-900">₹{dashboardStats.savedAmount.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Link
                  to="/vendor/order-history"
                  className="text-sm text-green-600 hover:text-green-800 font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.supplier}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{order.amount}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Group Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Active Group Orders</h3>
                <Link
                  to="/vendor/group-orders"
                  className="text-sm text-green-600 hover:text-green-800 font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {groupOrders.map((order) => (
                  <div key={order.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{order.product}</h4>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {order.savings} off
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Quantity: {order.quantity}</span>
                      <span>{order.participants} participants</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Deadline: {order.deadline}</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs">
                        Join Order
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/vendor/catalog"
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <Package className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <p className="font-medium text-gray-900">Browse Catalog</p>
                <p className="text-sm text-gray-600">Find products to order</p>
              </Link>

              <Link
                to="/vendor/group-orders"
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="font-medium text-gray-900">Join Group Order</p>
                <p className="text-sm text-gray-600">Save with bulk buying</p>
              </Link>

              <Link
                to="/vendor/individual-orders"
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <ShoppingBag className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <p className="font-medium text-gray-900">Place Order</p>
                <p className="text-sm text-gray-600">Order directly</p>
              </Link>

              <Link
                to="/vendor/profile"
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <User className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <p className="font-medium text-gray-900">Update Profile</p>
                <p className="text-sm text-gray-600">Manage your account</p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
