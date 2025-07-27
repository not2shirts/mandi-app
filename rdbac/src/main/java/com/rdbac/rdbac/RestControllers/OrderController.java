package com.rdbac.rdbac.RestControllers;

import com.rdbac.rdbac.Dto.OrderDto;
import com.rdbac.rdbac.Pojos.Order;
import com.rdbac.rdbac.Pojos.Enums.OrderStatus;
import com.rdbac.rdbac.Service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/orders")
@Slf4j
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    private String getCurrentUserPhoneNumber() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        throw new RuntimeException("User not authenticated");
    }

    // Vendor endpoints (ROLE_VENDOR required)
    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderDto orderDto) {
        String vendorPhone = getCurrentUserPhoneNumber();
        Order order = orderService.placeOrder(orderDto, vendorPhone);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders() {
        String vendorPhone = getCurrentUserPhoneNumber();
        List<Order> orders = orderService.getOrderHistoryByVendor(vendorPhone);
        return ResponseEntity.ok(orders);
    }

    @DeleteMapping("/{orderId}/cancel")
    public ResponseEntity<Void> cancelOrder(@PathVariable String orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable String orderId) {
        Order order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }

    // Supplier endpoints (ROLE_SUPPLIER required)
    @GetMapping("/supplier/pending")
    public ResponseEntity<List<Order>> getPendingOrders() {
        String supplierPhone = getCurrentUserPhoneNumber();
        List<Order> orders = orderService.getOrdersBySupplier(supplierPhone, OrderStatus.PENDING);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/supplier/confirmed")
    public ResponseEntity<List<Order>> getConfirmedOrders() {
        String supplierPhone = getCurrentUserPhoneNumber();
        List<Order> orders = orderService.getOrdersBySupplier(supplierPhone, com.rdbac.rdbac.Pojos.Enums.OrderStatus.CONFIRMED);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/supplier/processing")
    public ResponseEntity<List<Order>> getProcessingOrders() {
        String supplierPhone = getCurrentUserPhoneNumber();
        List<Order> orders = orderService.getOrdersBySupplier(supplierPhone, OrderStatus.PROCESSING);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/supplier/all")
    public ResponseEntity<List<Order>> getAllSupplierOrders(@RequestParam(required = false) OrderStatus status) {
        String supplierPhone = getCurrentUserPhoneNumber();
        List<Order> orders;
        if (status != null) {
            orders = orderService.getOrdersBySupplier(supplierPhone, status);
        } else {
            // Get all orders for this supplier (you'll need to implement this in the service)
            orders = orderService.getOrdersBySupplier(supplierPhone, null);
        }
        return ResponseEntity.ok(orders);
    }

    // Admin/Analytics endpoints
    @GetMapping("/date-range")
    public ResponseEntity<List<Order>> getOrdersByDateRange(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<Order> orders = orderService.getOrdersByDateRange(startDate, endDate);
        return ResponseEntity.ok(orders);
    }
}
