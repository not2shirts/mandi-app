package com.rdbac.rdbac.ServiceImplementation;

import com.rdbac.rdbac.Dto.ProductResponseDto;
import com.rdbac.rdbac.Pojos.App_User;
import com.rdbac.rdbac.Pojos.Order;

import com.rdbac.rdbac.Pojos.UserType;
import com.rdbac.rdbac.Pojos.Enums.OrderStatus;
import com.rdbac.rdbac.Repositry.App_User_Repositry;
import com.rdbac.rdbac.Repositry.OrderRepository;
import com.rdbac.rdbac.Service.ProductService;
import com.rdbac.rdbac.Service.VendorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class VendorServiceImplementation implements VendorService {

    private final App_User_Repositry appUserRepositry;
    private final ProductService productService;
    private final OrderRepository orderRepository;

    public VendorServiceImplementation(App_User_Repositry appUserRepositry,
                                     ProductService productService,
                                     OrderRepository orderRepository) {
        this.appUserRepositry = appUserRepositry;
        this.productService = productService;
        this.orderRepository = orderRepository;
    }

    @Override
    public App_User getVendorProfile(String phoneNumber) {
        return appUserRepositry.findByPhoneNumberAndUserType(phoneNumber, UserType.VENDOR)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
    }

    @Override
    public App_User updateVendorProfile(String phoneNumber, App_User updatedUser) {
        App_User vendor = getVendorProfile(phoneNumber);
        
        if (updatedUser.getName() != null) vendor.setName(updatedUser.getName());
        if (updatedUser.getBusinessName() != null) vendor.setBusinessName(updatedUser.getBusinessName());
        if (updatedUser.getBusinessAddress() != null) vendor.setBusinessAddress(updatedUser.getBusinessAddress());
        if (updatedUser.getEmail() != null) vendor.setEmail(updatedUser.getEmail());
        
        return appUserRepositry.save(vendor);
    }

    @Override
    public List<ProductResponseDto> getAllAvailableProducts() {
        return productService.getAllActiveProducts();
    }

    @Override
    public List<ProductResponseDto> getProductsByCategory(String category) {
        return productService.getProductsByCategory(category);
    }

    @Override
    public List<ProductResponseDto> searchProducts(String searchTerm) {
        return productService.searchProducts(searchTerm);
    }

    @Override
    public ProductResponseDto getProductDetails(String productId) {
        return productService.getProductById(productId);
    }

    @Override
    public List<Order> getMyOrderHistory(String vendorPhoneNumber) {
        return orderRepository.findByVendorPhoneNumber(vendorPhoneNumber);
    }

    @Override
    public List<Order> getMyOrdersByStatus(String vendorPhoneNumber, String status) {
        try {
            OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            return orderRepository.findByVendorPhoneNumberAndStatus(vendorPhoneNumber, orderStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid order status: " + status);
        }
    }

    @Override
    public Order getOrderDetails(String orderId, String vendorPhoneNumber) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!order.getVendorPhoneNumber().equals(vendorPhoneNumber)) {
            throw new RuntimeException("Unauthorized to view this order");
        }
        
        return order;
    }

    @Override
    public List<ProductResponseDto> getRecommendedProducts(String vendorPhoneNumber) {
        // Get vendor's order history to recommend similar products
        List<Order> orderHistory = getMyOrderHistory(vendorPhoneNumber);
        
        // Get most ordered categories
        List<String> orderedCategories = orderHistory.stream()
                .flatMap(order -> order.getOrderItems().stream())
                .map(item -> {
                    // You might need to fetch product details to get category
                    try {
                        ProductResponseDto product = productService.getProductById(item.getProductId());
                        return product.getCategory();
                    } catch (Exception e) {
                        return null;
                    }
                })
                .filter(category -> category != null)
                .distinct()
                .collect(Collectors.toList());
        
        // Recommend products from those categories
        return orderedCategories.stream()
                .flatMap(category -> productService.getProductsByCategory(category).stream())
                .distinct()
                .limit(10)
                .collect(Collectors.toList());
    }

    @Override
public List<ProductResponseDto> getNearGroupBuyProducts() {
    final double MIN_THRESHOLD = 50.0;
    final double MAX_THRESHOLD = 100.0;

    return productService.getAllActiveProducts().stream()
            .filter(product -> {
                Double progress = product.getGroupBuyProgressPercentage();
                return progress != null && progress > MIN_THRESHOLD && progress < MAX_THRESHOLD;
            })
            .sorted(Comparator.comparingDouble(
                ProductResponseDto::getGroupBuyProgressPercentage).reversed())
            .collect(Collectors.toList());
}

}
