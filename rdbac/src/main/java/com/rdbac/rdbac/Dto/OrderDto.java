package com.rdbac.rdbac.Dto;

import com.rdbac.rdbac.Pojos.OrderItem;
import com.rdbac.rdbac.Pojos.PaymentMode;
import lombok.Data;

import java.util.List;

@Data
public class OrderDto {
    private String supplierPhoneNumber;
    private List<OrderItem> orderItems;
    private PaymentMode paymentMode;
    private String deliveryAddress;
    private String deliveryArea;
    private String specialInstructions;
}
