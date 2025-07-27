package com.rdbac.rdbac.ServiceImplementation;

import com.rdbac.rdbac.Dto.ProductDto;
import com.rdbac.rdbac.Dto.ProductResponseDto;
import com.rdbac.rdbac.Pojos.*;
import com.rdbac.rdbac.Pojos.OrderStatus;
import com.rdbac.rdbac.Repositry.App_User_Repositry;
import com.rdbac.rdbac.Repositry.DailySummaryRepository;
import com.rdbac.rdbac.Repositry.OrderRepository;
import com.rdbac.rdbac.Repositry.ProductRepository;
import com.rdbac.rdbac.Service.ProductService;
import com.rdbac.rdbac.Service.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class SupplierServiceImplementation implements SupplierService {

    private final App_User_Repositry appUserRepositry;
    private final ProductService productService;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final DailySummaryRepository dailySummaryRepository;

    public SupplierServiceImplementation(App_User_Repositry appUserRepositry,
                                       ProductService productService,
                                       OrderRepository orderRepository,
                                       ProductRepository productRepository,
                                       DailySummaryRepository dailySummaryRepository) {
        this.appUserRepositry = appUserRepositry;
        this.productService = productService;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.dailySummaryRepository = dailySummaryRepository;
    }

    @Override
    public App_User getSupplierProfile(String phoneNumber) {
        return appUserRepositry.findByPhoneNumberAndUserType(phoneNumber, UserType.SUPPLIER)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
    }

    @Override
    public App_User updateSupplierProfile(String phoneNumber, App_User updatedUser) {
        App_User supplier = getSupplierProfile(phoneNumber);
        
        if (updatedUser.getName() != null) supplier.setName(updatedUser.getName());
        if (updatedUser.getBusinessName() != null) supplier.setBusinessName(updatedUser.getBusinessName());
        if (updatedUser.getBusinessAddress() != null) supplier.setBusinessAddress(updatedUser.getBusinessAddress());
        if (updatedUser.getEmail() != null) supplier.setEmail(updatedUser.getEmail());
        
        return appUserRepositry.save(supplier);
    }

    @Override
    public Product createProduct(ProductDto productDto, String supplierPhoneNumber) {
        return productService.createProduct(productDto, supplierPhoneNumber);
    }

    @Override
    public Product updateProduct(String productId, ProductDto productDto, String supplierPhoneNumber) {
        return productService.updateProduct(productId, productDto, supplierPhoneNumber);
    }

    @Override
    public void deleteProduct(String productId, String supplierPhoneNumber) {
        productService.deleteProduct(productId, supplierPhoneNumber);
    }

    @Override
    public List<ProductResponseDto> getMyProducts(String supplierPhoneNumber) {
        return productService.getProductsBySupplier(supplierPhoneNumber);
    }

    @Override
    public void updateProductAvailability(String productId, Integer quantity) {
        productService.updateProductQuantity(productId, quantity);
    }

    @Override
    public void updateProductPricing(String productId, Double individualPrice, Double groupPrice) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        if (individualPrice != null) product.setIndividualPrice(individualPrice);
        if (groupPrice != null) product.setGroupBuyPrice(groupPrice);
        product.setUpdatedDate(new Date());
        
        productRepository.save(product);
    }

    @Override
    public List<Order> getIncomingOrders(String supplierPhoneNumber) {
        return orderRepository.findBySupplierPhoneNumberAndStatus(supplierPhoneNumber, OrderStatus.PENDING);
    }

    @Override
    public List<Order> getOrdersByStatus(String supplierPhoneNumber, String status) {
        try {
            OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            return orderRepository.findBySupplierPhoneNumberAndStatus(supplierPhoneNumber, orderStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid order status: " + status);
        }
    }

    @Override
    public void updateOrderStatus(String orderId, String newStatus, String supplierPhoneNumber) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!order.getSupplierPhoneNumber().equals(supplierPhoneNumber)) {
            throw new RuntimeException("Unauthorized to update this order");
        }
        
        try {
            OrderStatus orderStatus = OrderStatus.valueOf(newStatus.toUpperCase());
            order.setStatus(orderStatus);
            order.setUpdatedAt(new Date());
            orderRepository.save(order);
            
            log.info("Order {} status updated to {} by supplier {}", orderId, newStatus, supplierPhoneNumber);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid order status: " + newStatus);
        }
    }

    @Override
    public DailySummary getTodaysSummary(String supplierPhoneNumber) {
        Date today = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(today);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date startOfDay = cal.getTime();
        
        return dailySummaryRepository.findBySupplierPhoneNumberAndSummaryDate(supplierPhoneNumber, startOfDay)
                .orElse(null);
    }

    @Override
    public List<DailySummary> getHistoricalSummaries(String supplierPhoneNumber, Date startDate, Date endDate) {
        return dailySummaryRepository.findBySupplierPhoneNumberAndSummaryDateBetween(
                supplierPhoneNumber, startDate, endDate);
    }

    @Override
    public Map<String, Object> getDashboardMetrics(String supplierPhoneNumber) {
        Map<String, Object> metrics = new HashMap<>();
        
        // Today's metrics
        Date today = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(today);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date startOfDay = cal.getTime();
        
        cal.add(Calendar.DAY_OF_MONTH, 1);
        Date startOfNextDay = cal.getTime();
        
        // Get today's orders
        List<Order> todaysOrders = orderRepository.findBySupplierPhoneNumberAndOrderDateBetween(
                supplierPhoneNumber, startOfDay, startOfNextDay);
        
        // Calculate metrics
        int totalOrders = todaysOrders.size();
        double totalRevenue = todaysOrders.stream()
                .mapToDouble(Order::getTotalAmount)
                .sum();
        
        long pendingOrders = todaysOrders.stream()
                .filter(order -> order.getStatus() == OrderStatus.PENDING)
                .count();
        
        // Get active products count
        List<Product> activeProducts = productRepository.findBySupplierPhoneNumberAndIsActiveTrue(supplierPhoneNumber);
        int activeProductsCount = activeProducts.size();
        
        metrics.put("totalOrdersToday", totalOrders);
        metrics.put("totalRevenueToday", totalRevenue);
        metrics.put("pendingOrders", pendingOrders);
        metrics.put("activeProducts", activeProductsCount);
        metrics.put("completedOrders", totalOrders - pendingOrders);
        
        return metrics;
    }

    @Override
    public String generateDeliveryRoute(String supplierPhoneNumber, Date date) {
        // Get orders for the specified date
        List<Order> ordersForDate = getDeliveryOrders(supplierPhoneNumber, date);
        
        if (ordersForDate.isEmpty()) {
            return "No orders found for the specified date";
        }
        
        // Extract delivery addresses
        List<String> addresses = ordersForDate.stream()
                .map(Order::getDeliveryAddress)
                .distinct()
                .toList();
        
        // In a real implementation, you would integrate with Google Maps API or similar
        // For now, we'll return a simple route description
        StringBuilder route = new StringBuilder("Delivery Route:\n");
        for (int i = 0; i < addresses.size(); i++) {
            route.append((i + 1)).append(". ").append(addresses.get(i)).append("\n");
        }
        
        // Update daily summary to mark route as generated
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date summaryDate = cal.getTime();
        
        dailySummaryRepository.findBySupplierPhoneNumberAndSummaryDate(supplierPhoneNumber, summaryDate)
                .ifPresent(summary -> {
                    summary.setRouteGenerated(true);
                    summary.setRouteUrl(route.toString());
                    dailySummaryRepository.save(summary);
                });
        
        return route.toString();
    }

    @Override
    public List<Order> getDeliveryOrders(String supplierPhoneNumber, Date date) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date startOfDay = cal.getTime();
        
        cal.add(Calendar.DAY_OF_MONTH, 1);
        Date startOfNextDay = cal.getTime();
        
        return orderRepository.findBySupplierPhoneNumberAndOrderDateBetween(
                supplierPhoneNumber, startOfDay, startOfNextDay);
    }
}
