package com.rdbac.rdbac.Pojos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@Getter
@Setter
public class Product {
    
    @Id
    private String productId;
    private String name;
    private String description;
    private String category; // Vegetables, Spices, Oil, etc.
    private String supplierPhoneNumber; // Reference to supplier
    private String supplierName;
    private String origin; // e.g., "Nashik" for onions
    private String qualityGrade; // A-grade, B-grade
    private Double individualPrice; // Price per kg/litre for individual orders
    private Double groupBuyPrice; // Price per kg/litre for group orders
    private Integer groupBuyThreshold; // Minimum quantity for group price (in kg)
    private String unit; // kg, litre, piece, etc.
    private Integer availableQuantity; // Available stock
    private Date createdDate;
    private Date updatedDate;
    private Boolean isActive; // Whether product is available today
    private String imageUrl; // Product image URL
}
