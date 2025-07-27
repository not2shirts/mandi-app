package com.rdbac.rdbac.Service;

import com.rdbac.rdbac.Dto.ProductDto;
import com.rdbac.rdbac.Dto.ProductResponseDto;
import com.rdbac.rdbac.Pojos.App_User;
import com.rdbac.rdbac.Pojos.DailySummary;
import com.rdbac.rdbac.Pojos.Order;
import com.rdbac.rdbac.Pojos.Product;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface SupplierService {
    // Profile management
    App_User getSupplierProfile(String phoneNumber);
    App_User updateSupplierProfile(String phoneNumber, App_User updatedUser);
    
    // Product management for suppliers
    Product createProduct(ProductDto productDto, String supplierPhoneNumber);
    Product updateProduct(String productId, ProductDto productDto, String supplierPhoneNumber);
    void deleteProduct(String productId, String supplierPhoneNumber);
    List<ProductResponseDto> getMyProducts(String supplierPhoneNumber);
    void updateProductAvailability(String productId, Integer quantity);
    void updateProductPricing(String productId, Double individualPrice, Double groupPrice);
    
    // Order management for suppliers
    List<Order> getIncomingOrders(String supplierPhoneNumber);
    List<Order> getOrdersByStatus(String supplierPhoneNumber, String status);
    void updateOrderStatus(String orderId, String newStatus, String supplierPhoneNumber);
    
    // Dashboard and analytics
    DailySummary getTodaysSummary(String supplierPhoneNumber);
    List<DailySummary> getHistoricalSummaries(String supplierPhoneNumber, Date startDate, Date endDate);
    Map<String, Object> getDashboardMetrics(String supplierPhoneNumber);
    
    // Route management
    String generateDeliveryRoute(String supplierPhoneNumber, Date date);
    List<Order> getDeliveryOrders(String supplierPhoneNumber, Date date);
}
