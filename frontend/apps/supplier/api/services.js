


// src/api/services.js
import { api } from './axios';

// Vendor Profile Services
export const vendorProfileService = {
  getProfile: () => api.get('/vendor/profile'),
  updateProfile: (profileData) => api.put('/vendor/profile', profileData)
};

// Order Services
// Order Services
export const orderService = {
  getAllOrders: () => api.get('/vendor/orders'),
  getOrdersByStatus: (status) => api.get(`/vendor/orders/status/${status}`),
  getOrderById: (orderId) => api.get(`/vendor/orders/${orderId}`),
  createOrder: (orderData) => api.post('/vendor/orders', orderData),
  placeOrder: (orderData) => api.post('/orders/place', orderData) // ✅ New line added
};


// Product Services
export const productService = {
  searchProducts: (query) => api.get(`/vendor/products/search?query=${encodeURIComponent(query)}`),
  getProductsByCategory: (category) => api.get(`/vendor/products/category/${category}`),
  getProductById: (productId) => api.get(`/vendor/products/${productId}`),
  getAllProducts: () => api.get('/vendor/products')
};

// Group Buy Services
export const groupBuyService = {
  getGroupBuyOpportunities: () => api.get('/vendor/group-buy-opportunities'),
  joinGroupBuy: (groupBuyData) => api.post('/vendor/group-buy-opportunities/join', groupBuyData)
};

// Recommendations Services
export const recommendationService = {
  getRecommendations: () => api.get('/vendor/recommendations')
};

// Categories Service (if needed)
export const categoryService = {
  getAllCategories: () => api.get('/vendor/categories')
};

// Supplier Services
export const supplierService = {
  getAllSuppliers: () => api.get('/vendor/suppliers'),
  getSupplierById: (supplierId) => api.get(`/vendor/suppliers/${supplierId}`),
  getSupplierProducts: (supplierId) => api.get(`/vendor/suppliers/${supplierId}/products`)
};

// Order Status Enum mapping (based on backend model)
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

// Payment Mode Enum mapping
export const PAYMENT_MODE = {
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
  ONLINE_PAYMENT: 'ONLINE_PAYMENT',
  BANK_TRANSFER: 'BANK_TRANSFER'
};

// Helper function to format dates
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper function to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

// Helper function to get order status color
export const getOrderStatusColor = (status) => {
  const colors = {
    [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
    [ORDER_STATUS.PROCESSING]: 'bg-blue-100 text-blue-800',
    [ORDER_STATUS.SHIPPED]: 'bg-purple-100 text-purple-800',
    [ORDER_STATUS.DELIVERED]: 'bg-green-100 text-green-800',
    [ORDER_STATUS.CANCELLED]: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Error handling utility
export const handleApiError = (error, fallbackMessage = 'An error occurred') => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || error.response.statusText || fallbackMessage;
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || fallbackMessage;
  }
};
