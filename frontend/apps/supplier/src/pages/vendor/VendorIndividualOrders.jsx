
import React, { useEffect, useState } from 'react';
import { productService, orderService, handleApiError } from '../../../api/services';
import { useNavigate } from 'react-router-dom';
import {
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrash,
  FaShoppingBag,
  FaLeaf
} from 'react-icons/fa';



export function VendorIndividualOrders() {
 const [products, setProducts] = useState([]);
  const [orderSummary, setOrderSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getAllProducts();
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    const existing = orderSummary.find((item) => item.productId === product.productId);
    if (existing) return;
    setOrderSummary([...orderSummary, { ...product, defaultQty: 1 }]);
  };

  const updateQuantity = (productId, change) => {
    setOrderSummary((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, defaultQty: Math.max(1, item.defaultQty + change) }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setOrderSummary((prev) => prev.filter((item) => item.productId !== productId));
  };

  const calculateTotal = () =>
    orderSummary.reduce(
      (total, item) => total + item.individualPrice * item.defaultQty,
      0
    ).toFixed(2);

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    setErrorMsg('');

    try {
      const orderPayload = {
        supplierPhoneNumber: orderSummary[0]?.supplierPhoneNumber || '9926783455',
        orderItems: orderSummary.map((item) => ({
          productId: item.productId,
          productName: item.name,
          quantity: item.defaultQty,
          unit: item.unit,
          unitPrice: item.individualPrice,
          totalPrice: item.individualPrice * item.defaultQty,
          isGroupPriceApplied: false,
          qualityGrade: item.qualityGrade || 'A'
        })),
        paymentMode: 'CASH_ON_DELIVERY',
        deliveryAddress: 'Shop No. 5, Sector 10 Market, Nashik',
        deliveryArea: 'Nashik, Maharashtra',
        specialInstructions: 'Please deliver between 8 AM – 10 AM. Call before arriving.'
      };

      await orderService.placeOrder(orderPayload);
      alert('Order placed successfully!');
      navigate('/my-orders');
    } catch (err) {
      console.error('Order placement failed:', err);
      setErrorMsg(handleApiError(err, 'Order could not be placed.'));
    } finally {
      setPlacingOrder(false);
    }
  };

  const getProductImage = (productName) => {
    const imageMap = {
      'Fresh Tomatoes':
        'https://images.unsplash.com/photo-1546470427-b1d7edea5e0b?w=300&h=200&fit=crop',
      'Red Onions':
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop',
      'Potatoes':
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop',
      'Carrots':
        'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=300&h=200&fit=crop',
      'Basmati Rice':
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
      'Wheat Flour':
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
      'Cooking Oil':
        'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop',
      'Mixed Spices':
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop'
    };
    return (
      imageMap[productName] ||
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Individual Orders</h1>
          <p className="text-xl text-gray-600">
            Browse fresh ingredients and place orders for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaShoppingBag className="mr-3 text-orange-500" />
              Available Products
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.productId}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={product.imageUrl || getProductImage(product.name)}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        <FaLeaf className="inline mr-1" />{' '}
                        {product.qualityGrade || 'Fresh'}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <div className="text-gray-600 mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span>Supplier:</span>
                          <span className="font-semibold">{product.supplierName}</span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span>Available:</span>
                          <span className="font-semibold">
                            {product.availableQuantity} {product.unit}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Price per {product.unit}:</span>
                          <span className="font-bold text-orange-600 text-lg">
                            ₹{product.individualPrice}
                          </span>
                        </div>
                      </div>

                      <button
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center justify-center"
                        onClick={() => handleAdd({ ...product, defaultQty: 1 })}
                        disabled={orderSummary.some(
                          (item) => item.productId === product.productId
                        )}
                      >
                        {orderSummary.some(
                          (item) => item.productId === product.productId
                        ) ? (
                          <>
                            <FaShoppingCart className="mr-2" /> Added
                          </>
                        ) : (
                          <>
                            <FaPlus className="mr-2" /> Add to Order
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaShoppingCart className="mr-3 text-orange-500" />
                Order Summary
              </h2>

              {orderSummary.length === 0 ? (
                <div className="text-center py-8">
                  <FaShoppingCart className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No items added yet</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {orderSummary.map((item) => (
                      <div key={item.productId} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.productId, -1)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="font-semibold w-8 text-center">
                              {item.defaultQty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, 1)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              ₹{item.individualPrice} × {item.defaultQty}
                            </div>
                            <div className="font-bold text-orange-600">
                              ₹{(item.individualPrice * item.defaultQty).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {errorMsg && (
                    <p className="text-sm text-red-600 text-center mb-4">{errorMsg}</p>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-gray-800">Total:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        ₹{calculateTotal()}
                      </span>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={placingOrder}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 flex items-center justify-center"
                    >
                      <FaShoppingCart className="mr-2" />
                      {placingOrder ? 'Placing...' : 'Place Order'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
