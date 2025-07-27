package com.rdbac.rdbac.Pojos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class OrderItem {
    
    private String productId;
    private String productName;
    private Integer quantity;
    private String unit; // kg, litre, piece, etc.
    private Double unitPrice; // Price at which item was ordered (individual or group price)
    private Double totalPrice; // quantity * unitPrice
    private Boolean isGroupPriceApplied; // Whether group price was applied
    private String qualityGrade; // A-grade, B-grade
}
