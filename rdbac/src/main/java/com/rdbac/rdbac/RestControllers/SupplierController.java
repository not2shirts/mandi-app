package com.rdbac.rdbac.RestControllers;

import com.rdbac.rdbac.Dto.ProductDto;
import com.rdbac.rdbac.Dto.ProductResponseDto;
import com.rdbac.rdbac.Pojos.App_User;
import com.rdbac.rdbac.Pojos.DailySummary;
import com.rdbac.rdbac.Pojos.Order;
import com.rdbac.rdbac.Pojos.Product;
import com.rdbac.rdbac.Service.SupplierService;
import com.rdbac.rdbac.ServiceImplementation.SupplierServiceImplementation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/supplier")
@Slf4j
@PreAuthorize("hasRole('SUPPLIER')")
public class SupplierController {

    private final SupplierServiceImplementation supplierService;

    public SupplierController(SupplierServiceImplementation
     supplierService) {
        this.supplierService = supplierService;
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
        App_User profile = supplierService.getSupplierProfile(phoneNumber);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<App_User> updateProfile(@RequestBody App_User updatedUser) {
        String phoneNumber = getCurrentUserPhoneNumber();
        App_User profile = supplierService.updateSupplierProfile(phoneNumber, updatedUser);
        return ResponseEntity.ok(profile);
    }

    // Product management
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
        String phoneNumber = getCurrentUserPhoneNumber();
        Product product = supplierService.createProduct(productDto, phoneNumber);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable String productId, @RequestBody ProductDto productDto) {
        String phoneNumber = getCurrentUserPhoneNumber();
        Product product = supplierService.updateProduct(productId, productDto, phoneNumber);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String productId) {
        String phoneNumber = getCurrentUserPhoneNumber();
        supplierService.deleteProduct(productId, phoneNumber);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/products/my")
    public ResponseEntity<List<ProductResponseDto>> getMyProducts() {
        String phoneNumber = getCurrentUserPhoneNumber();
        List<ProductResponseDto> products = supplierService.getMyProducts(phoneNumber);
        return ResponseEntity.ok(products);
    }

    // Order management
    @GetMapping("/orders/incoming")
    public ResponseEntity<List<Order>> getIncomingOrders() {
        String phoneNumber = getCurrentUserPhoneNumber();
        List<Order> orders = supplierService.getIncomingOrders(phoneNumber);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<Void> updateOrderStatus(@PathVariable String orderId, @RequestParam String status) {
        String phoneNumber = getCurrentUserPhoneNumber();
        supplierService.updateOrderStatus(orderId, status, phoneNumber);
        return ResponseEntity.ok().build();
    }

    // Dashboard and analytics
    @GetMapping("/summary/today")
    public ResponseEntity<DailySummary> getTodaysSummary() {
        String phoneNumber = getCurrentUserPhoneNumber();
        DailySummary summary = supplierService.getTodaysSummary(phoneNumber);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/summary/historical")
    public ResponseEntity<List<DailySummary>> getHistoricalSummaries(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        String phoneNumber = getCurrentUserPhoneNumber();
        List<DailySummary> summaries = supplierService.getHistoricalSummaries(phoneNumber, startDate, endDate);
        return ResponseEntity.ok(summaries);
    }

    @GetMapping("/dashboard/metrics")
    public ResponseEntity<Map<String, Object>> getDashboardMetrics() {
        String phoneNumber = getCurrentUserPhoneNumber();
        Map<String, Object> metrics = supplierService.getDashboardMetrics(phoneNumber);
        return ResponseEntity.ok(metrics);
    }

    // Route management
    @GetMapping("/route/generate")
    public ResponseEntity<String> generateDeliveryRoute(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        String phoneNumber = getCurrentUserPhoneNumber();
        String route = supplierService.generateDeliveryRoute(phoneNumber, date);
        return ResponseEntity.ok(route);
    }
}
