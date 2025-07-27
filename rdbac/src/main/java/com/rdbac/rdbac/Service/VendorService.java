package com.rdbac.rdbac.Service;

import com.rdbac.rdbac.Dto.ProductResponseDto;
import com.rdbac.rdbac.Pojos.App_User;
import com.rdbac.rdbac.Pojos.Order;

import java.util.List;

public interface VendorService {
    // Profile management
    App_User getVendorProfile(String phoneNumber);
    App_User updateVendorProfile(String phoneNumber, App_User updatedUser);
    
    // Product browsing for vendors
    List<ProductResponseDto> getAllAvailableProducts();
    List<ProductResponseDto> getProductsByCategory(String category);
    List<ProductResponseDto> searchProducts(String searchTerm);
    ProductResponseDto getProductDetails(String productId);
    
    // Order management for vendors
    List<Order> getMyOrderHistory(String vendorPhoneNumber);
    List<Order> getMyOrdersByStatus(String vendorPhoneNumber, String status);
    Order getOrderDetails(String orderId, String vendorPhoneNumber);
    
    // Recommendations
    List<ProductResponseDto> getRecommendedProducts(String vendorPhoneNumber);
    List<ProductResponseDto> getNearGroupBuyProducts();
}
