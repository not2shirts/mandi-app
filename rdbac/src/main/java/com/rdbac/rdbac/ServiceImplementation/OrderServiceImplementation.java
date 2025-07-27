package com.rdbac.rdbac.ServiceImplementation;

import com.rdbac.rdbac.Dto.OrderDto;
import com.rdbac.rdbac.Pojos.Order;
import com.rdbac.rdbac.Pojos.OrderItem;
import com.rdbac.rdbac.Pojos.OrderStatus;
import com.rdbac.rdbac.Repositry.OrderRepository;
import com.rdbac.rdbac.Service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class OrderServiceImplementation implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImplementation(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order placeOrder(OrderDto orderDto, String vendorPhoneNumber) {
        Order order = new Order();
        order.setOrderId(UUID.randomUUID().toString());
        order.setVendorPhoneNumber(vendorPhoneNumber);
        order.setSupplierPhoneNumber(orderDto.getSupplierPhoneNumber());
        order.setOrderItems(orderDto.getOrderItems());
        order.setTotalAmount(calculateTotal(orderDto.getOrderItems()));
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentMode(orderDto.getPaymentMode());
        order.setDeliveryAddress(orderDto.getDeliveryAddress());
        order.setDeliveryArea(orderDto.getDeliveryArea());
        order.setOrderDate(new Date());
        order.setCreatedAt(new Date());
        order.setUpdatedAt(new Date());
        order.setSpecialInstructions(orderDto.getSpecialInstructions());
        order.setIsGroupOrder(checkIfGroupOrder(orderDto.getOrderItems()));

        log.info("Placing order: {} by vendor: {}", order.getOrderId(), vendorPhoneNumber);
        return orderRepository.save(order);
    }

    private Double calculateTotal(List<OrderItem> items) {
        return items.stream().mapToDouble(item -> item.getTotalPrice()).sum();
    }

    private Boolean checkIfGroupOrder(List<OrderItem> items) {
        return items.stream().anyMatch(OrderItem::getIsGroupPriceApplied);
    }

    @Override
    public List<Order> getOrderHistoryByVendor(String vendorPhoneNumber) {
        return orderRepository.findByVendorPhoneNumber(vendorPhoneNumber);
    }

    

    @Override
    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public void cancelOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getStatus().equals(OrderStatus.PENDING)) {
            throw new RuntimeException("Only pending orders can be cancelled");
        }

        order.setStatus(OrderStatus.CANCELLED);
        order.setUpdatedAt(new Date());
        orderRepository.save(order);
    }

    @Override
    public List<Order> getOrdersByDateRange(Date startDate, Date endDate) {
        return orderRepository.findByOrderDateBetween(startDate, endDate);
    }

    @Override
    public List<Order> getOrdersBySupplier(String supplierPhoneNumber, com.rdbac.rdbac.Pojos.Enums.OrderStatus status) {
        // TODO Auto-generated method stub
       return orderRepository.findBySupplierPhoneNumberAndStatus(supplierPhoneNumber, status);
    }
}

