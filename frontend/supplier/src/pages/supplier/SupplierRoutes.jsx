import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Route, 
  MapPin, 
  Clock, 
  Calendar, 
  Filter, 
  Download, 
  Share, 
  Navigation,
  Truck,
  ArrowLeft,
  ArrowUpDown,
  GripVertical,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  MoreVertical,
  FileText,
  Mail,
  Search
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export function SupplierRoutes() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2024-01-17');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [sortBy, setSortBy] = useState('location'); // 'location', 'time', 'priority'
  const [draggedItem, setDraggedItem] = useState(null);

  // Mock delivery data
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL001',
      orderId: 'ORD001',
      vendor: {
        name: 'Rajesh Food Cart',
        contact: '+91 98765 43210',
        address: 'Shop 15, Food Street, Andheri West, Mumbai - 400058',
        coordinates: { lat: 19.1136, lng: 72.8697 }
      },
      items: [
        { name: 'Organic Tomatoes', quantity: '50kg' }
      ],
      estimatedTime: '30 mins',
      scheduledTime: '09:00 AM',
      status: 'scheduled',
      priority: 'normal',
      distance: '2.5 km',
      orderValue: 2500,
      deliveryNotes: 'Call before delivery'
    },
    {
      id: 'DEL002',
      orderId: 'GRP002',
      vendor: {
        name: 'Group Delivery - Bandra Area',
        contact: '+91 87654 32109',
        address: 'Multiple locations in Bandra East, Mumbai - 400051',
        coordinates: { lat: 19.0596, lng: 72.8295 }
      },
      items: [
        { name: 'Fresh Onions', quantity: '200kg' },
        { name: 'Potatoes', quantity: '100kg' }
      ],
      estimatedTime: '45 mins',
      scheduledTime: '11:30 AM',
      status: 'in-transit',
      priority: 'high',
      distance: '8.2 km',
      orderValue: 8500,
      deliveryNotes: 'Group order - 4 stops in Bandra area'
    },
    {
      id: 'DEL003',
      orderId: 'ORD003',
      vendor: {
        name: 'Priya Snacks Corner',
        contact: '+91 76543 21098',
        address: 'Corner Shop, Market Road, Bandra East, Mumbai - 400051',
        coordinates: { lat: 19.0596, lng: 72.8295 }
      },
      items: [
        { name: 'Green Peppers', quantity: '30kg' }
      ],
      estimatedTime: '25 mins',
      scheduledTime: '02:00 PM',
      status: 'not-scheduled',
      priority: 'normal',
      distance: '5.1 km',
      orderValue: 1800,
      deliveryNotes: ''
    },
    {
      id: 'DEL004',
      orderId: 'ORD004',
      vendor: {
        name: 'Mumbai Street Foods',
        contact: '+91 65432 10987',
        address: 'Stall 8, Station Road, Borivali West, Mumbai - 400092',
        coordinates: { lat: 19.2307, lng: 72.8567 }
      },
      items: [
        { name: 'Ginger', quantity: '25kg' }
      ],
      estimatedTime: '20 mins',
      scheduledTime: '04:30 PM',
      status: 'scheduled',
      priority: 'normal',
      distance: '15.3 km',
      orderValue: 1250,
      deliveryNotes: 'Fragile items - handle with care'
    },
    {
      id: 'DEL005',
      orderId: 'ORD005',
      vendor: {
        name: 'Delhi Delights',
        contact: '+91 54321 09876',
        address: 'Shop 25, Commercial Complex, Thane - 400601',
        coordinates: { lat: 19.2183, lng: 72.9781 }
      },
      items: [
        { name: 'Basmati Rice', quantity: '100kg' },
        { name: 'Turmeric Powder', quantity: '10kg' }
      ],
      estimatedTime: '40 mins',
      scheduledTime: '06:00 PM',
      status: 'delivered',
      priority: 'high',
      distance: '22.1 km',
      orderValue: 9200,
      deliveryNotes: 'Large order - use bigger vehicle'
    }
  ]);

  const updateDeliveryStatus = (deliveryId, newStatus) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === deliveryId ? { ...delivery, status: newStatus } : delivery
    ));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'not-scheduled': { bg: 'bg-gray-100', text: 'text-gray-800', icon: Clock },
      'scheduled': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Calendar },
      'in-transit': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Truck },
      'delivered': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle }
    };

    const config = statusConfig[status] || statusConfig['not-scheduled'];
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3" />
        {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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

  const sortedDeliveries = [...deliveries].sort((a, b) => {
    switch (sortBy) {
      case 'location':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'time':
        return a.scheduledTime.localeCompare(b.scheduledTime);
      case 'priority':
        const priorityOrder = { high: 3, normal: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default:
        return 0;
    }
  });

  const filteredDeliveries = sortedDeliveries.filter(delivery => {
    const matchesStatus = selectedStatus === 'all' || delivery.status === selectedStatus;
    return matchesStatus;
  });

  const handleDragStart = (e, delivery) => {
    setDraggedItem(delivery);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDelivery) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetDelivery.id) return;

    const draggedIndex = deliveries.findIndex(d => d.id === draggedItem.id);
    const targetIndex = deliveries.findIndex(d => d.id === targetDelivery.id);

    const newDeliveries = [...deliveries];
    newDeliveries.splice(draggedIndex, 1);
    newDeliveries.splice(targetIndex, 0, draggedItem);

    setDeliveries(newDeliveries);
    setDraggedItem(null);
  };

  const exportRoutes = (format) => {
    // Mock export functionality
    const data = filteredDeliveries.map(delivery => ({
      OrderID: delivery.orderId,
      Vendor: delivery.vendor.name,
      Address: delivery.vendor.address,
      Items: delivery.items.map(item => `${item.name} (${item.quantity})`).join(', '),
      ScheduledTime: delivery.scheduledTime,
      Status: delivery.status,
      Distance: delivery.distance
    }));

    console.log(`Exporting ${format.toUpperCase()}:`, data);
    alert(`Route data exported as ${format.toUpperCase()}!`);
  };

  const shareRoute = () => {
    const routeUrl = `${window.location.origin}/shared-route/${selectedDate}`;
    navigator.clipboard.writeText(routeUrl);
    alert('Route link copied to clipboard!');
  };

  const optimizeRoute = () => {
    setSortBy('location');
    alert('Route optimized by nearest location!');
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
              <h1 className="text-2xl font-bold text-gray-900">Route Planning</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={optimizeRoute}
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Optimize Route
              </Button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 text-sm rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1 text-sm rounded ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
                >
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Date Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Filter
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="not-scheduled">Not Scheduled</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="location">Nearest Location</option>
                  <option value="time">Delivery Time</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>

            {/* Export Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => exportRoutes('pdf')}
                variant="outline"
                size="sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button
                onClick={() => exportRoutes('csv')}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button
                onClick={shareRoute}
                variant="outline"
                size="sm"
              >
                <Share className="w-4 h-4 mr-2" />
                Share Route
              </Button>
            </div>
          </div>
        </div>

        {/* Route Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Deliveries</p>
                <p className="text-2xl font-bold text-gray-900">{filteredDeliveries.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Distance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredDeliveries.reduce((sum, d) => sum + parseFloat(d.distance), 0).toFixed(1)} km
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Est. Time</p>
                <p className="text-2xl font-bold text-gray-900">6h 30m</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredDeliveries.filter(d => d.priority === 'high').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Deliveries List */}
        {viewMode === 'list' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Delivery Schedule</h3>
                <p className="text-sm text-gray-600">
                  Drag and drop to reorder stops • Click status to update
                </p>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredDeliveries.map((delivery, index) => (
                <div
                  key={delivery.id}
                  className="p-6 hover:bg-gray-50 cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, delivery)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, delivery)}
                >
                  <div className="flex items-center gap-4">
                    {/* Drag Handle */}
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                        {index + 1}
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-4">
                      {/* Order & Vendor */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{delivery.orderId}</span>
                          {getPriorityBadge(delivery.priority)}
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{delivery.vendor.name}</h4>
                        <p className="text-sm text-gray-600">{delivery.vendor.contact}</p>
                      </div>

                      {/* Location */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-900">{delivery.vendor.address}</p>
                            <p className="text-xs text-gray-500">Distance: {delivery.distance}</p>
                          </div>
                        </div>
                      </div>

                      {/* Items & Time */}
                      <div>
                        <div className="mb-2">
                          {delivery.items.map((item, idx) => (
                            <div key={idx} className="text-sm text-gray-900">
                              {item.name} ({item.quantity})
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {delivery.scheduledTime} ({delivery.estimatedTime})
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center justify-between">
                        <select
                          value={delivery.status}
                          onChange={(e) => updateDeliveryStatus(delivery.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="not-scheduled">Not Scheduled</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="in-transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Notes */}
                  {delivery.deliveryNotes && (
                    <div className="mt-3 ml-14 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> {delivery.deliveryNotes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredDeliveries.length === 0 && (
              <div className="text-center py-12">
                <Route className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No deliveries scheduled for the selected date.</p>
              </div>
            )}
          </div>
        ) : (
          /* Map View */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center py-20">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Map View Coming Soon</h3>
              <p className="text-gray-600 mb-6">
                Interactive map with delivery locations and optimized routes will be available here.
              </p>
              <Button
                onClick={() => setViewMode('list')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Switch to List View
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
