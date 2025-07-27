package com.rdbac.rdbac.RestControllers;

import com.rdbac.rdbac.Dto.ProductResponseDto;
import com.rdbac.rdbac.Pojos.App_User;
import com.rdbac.rdbac.Pojos.Order;
import com.rdbac.rdbac.Service.VendorService;
import com.rdbac.rdbac.ServiceImplementation.VendorServiceImplementation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendor")
@Slf4j
@PreAuthorize("hasRole('VENDOR')")
public class VendorController {

    private final VendorServiceImplementation vendorService;

    public VendorController(VendorServiceImplementation vendorService) {
        this.vendorService = vendorService;
    }

    private String getCurrentUserPhoneNumber() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        throw new RuntimeException("User not authenticated");
    }

    // Profile management
    @GetMapping("/profile")
    public ResponseEntity<App_User> getProfile() {
        String phoneNumber = getCurrentUserPhoneNumber();
        App_User profile = vendorService.getVendorProfile(phoneNumber);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<App_User> updateProfile(@RequestBody App_User updatedUser) {
        String phoneNumber = getCurrentUserPhoneNumber();
        App_User profile = vendorService.updateVendorProfile(phoneNumber, updatedUser);
        return ResponseEntity.ok(profile);
    }

    // Product browsing
    @GetMapping("/products")
    public ResponseEntity<List<ProductResponseDto>> getAllProducts() {
        List<ProductResponseDto> products = vendorService.getAllAvailableProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/category/{category}")
    public ResponseEntity<List<ProductResponseDto>> getProductsByCategory(@PathVariable String category) {
        List<ProductResponseDto> products = vendorService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<ProductResponseDto>> searchProducts(@RequestParam String query) {
        List<ProductResponseDto> products = vendorService.searchProducts(query);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<ProductResponseDto> getProductDetails(@PathVariable String productId) {
        ProductResponseDto product = vendorService.getProductDetails(productId);
        return ResponseEntity.ok(product);
    }

    // Order management
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getMyOrders() {
        String phoneNumber = getCurrentUserPhoneNumber();
        List<Order> orders = vendorService.getMyOrderHistory(phoneNumber);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/orders/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable String status) {
        String phoneNumber = getCurrentUserPhoneNumber();
        List<Order> orders = vendorService.getMyOrdersByStatus(phoneNumber, status);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable String orderId) {
        String phoneNumber = getCurrentUserPhoneNumber();
        Order order = vendorService.getOrderDetails(orderId, phoneNumber);
        return ResponseEntity.ok(order);
    }

    // Recommendations
    @GetMapping("/recommendations")
    public ResponseEntity<List<ProductResponseDto>> getRecommendedProducts() {
        String phoneNumber = getCurrentUserPhoneNumber();
        List<ProductResponseDto> products = vendorService.getRecommendedProducts(phoneNumber);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/group-buy-opportunities")
    public ResponseEntity<List<ProductResponseDto>> getGroupBuyOpportunities() {
        List<ProductResponseDto> products = vendorService.getNearGroupBuyProducts();
        return ResponseEntity.ok(products);
    }
}
