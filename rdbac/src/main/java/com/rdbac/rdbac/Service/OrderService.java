package com.rdbac.rdbac.Service;

import com.rdbac.rdbac.Dto.OrderDto;
import com.rdbac.rdbac.Pojos.Order;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public interface OrderService {
    Order placeOrder(OrderDto orderDto, String vendorPhoneNumber);
    List<Order> getOrderHistoryByVendor(String vendorPhoneNumber);
    List<Order> getOrdersBySupplier(String supplierPhoneNumber, com.rdbac.rdbac.Pojos.Enums.OrderStatus status);
    Order getOrderById(String orderId);
    void cancelOrder(String orderId);
    List<Order> getOrdersByDateRange(Date startDate, Date endDate);
}
