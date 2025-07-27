import React, { useEffect, useState } from 'react';
import {
  orderService,
  handleApiError,
  formatDate,
  getOrderStatusColor,
} from '../../../api/services';
import {
  FaClipboardList,
  FaFilter,
  FaShoppingBag,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaEye,
} from 'react-icons/fa';


export function VendorOrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res =
        statusFilter === 'all'
          ? await orderService.getAllOrders()
          : await orderService.getOrdersByStatus(statusFilter);
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(handleApiError(err, 'Failed to load orders.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaClipboardList className="text-blue-600" />
        My Orders
      </h1>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Filter by status:</label>
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      </div>

      {/* Loading / Error / Empty */}
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order, i) => (
            <div key={i} className="bg-white border shadow-md rounded-lg p-6 space-y-4">
              {/* Order ID + Status */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-blue-700">Order ID</h3>
                  <p className="text-sm text-gray-700 break-all">{order.orderId}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getOrderStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Metadata */}
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Supplier Phone:</strong>{' '}
                  {order.supplierPhoneNumber || 'N/A'}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.totalAmount || 0}
                </p>
                <p>
                  <strong>Payment Mode:</strong>{' '}
                  {order.paymentMode?.replace(/_/g, ' ') || 'N/A'}
                </p>
                <p>
                  <strong>Group Order:</strong>{' '}
                  {order.isGroupOrder ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>Delivery Address:</strong>{' '}
                  {order.deliveryAddress || 'N/A'}
                </p>
                <p>
                  <strong>Delivery Area:</strong>{' '}
                  {order.deliveryArea || 'Nashik'}
                </p>
                <p>
                  <strong>Order Date:</strong>{' '}
                  {order.orderDate ? formatDate(order.orderDate) : 'N/A'}
                </p>
                {order.deliveryDate && (
                  <p>
                    <strong>Delivery Date:</strong>{' '}
                    {formatDate(order.deliveryDate)}
                  </p>
                )}
                {order.specialInstructions && (
                  <p>
                    <strong>Instructions:</strong>{' '}
                    {order.specialInstructions}
                  </p>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-sm font-semibold mb-1 text-gray-800">
                  Items:
                </h4>
                <ul className="bg-gray-50 border rounded p-3 text-sm space-y-1">
                  {(order.orderItems || []).map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>
                        {item.productName || 'Product'} ({item.quantity}{' '}
                        {item.unit || 'unit'})
                      </span>
                      <span>₹{item.totalPrice || 0}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="text-right">
                <button className="text-blue-600 hover:underline text-sm font-medium">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
