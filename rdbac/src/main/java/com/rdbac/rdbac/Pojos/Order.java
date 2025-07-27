package com.rdbac.rdbac.Pojos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.Date;
import java.util.List;

@Document
@Data
@Getter
@Setter
public class Order {
    
    @Id
    private String orderId;
    private String vendorPhoneNumber; // Reference to vendor
    private String vendorName;
    private String supplierPhoneNumber; // Reference to supplier
    private String supplierName;
    private List<OrderItem> orderItems;
    private Double totalAmount;
    private OrderStatus status;
    private PaymentMode paymentMode;
    private String deliveryAddress;
    private String deliveryArea; // For grouping nearby deliveries
    private Date orderDate;
    private Date deliveryDate;
    private Date createdAt;
    private Date updatedAt;
    private String specialInstructions;
    private Boolean isGroupOrder; // Whether this order qualifies for group pricing
}



