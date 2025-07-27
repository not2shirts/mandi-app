package com.rdbac.rdbac.Dto;

import lombok.Data;

@Data
public class ProductResponseDto {
    private String productId;
    private String name;
    private String description;
    private String category;
    private String supplierName;
    private String origin;
    private String qualityGrade;
    private Double individualPrice;
    private Double groupBuyPrice;
    private Integer groupBuyThreshold;
    private String unit;
    private Integer availableQuantity;
    private String imageUrl;
    
    // Group buy progress information
    private Integer currentGroupQuantity; // Current quantity ordered by all vendors
    private Double groupBuyProgressPercentage; // Progress towards group buy threshold
    private Boolean groupBuyAchieved; // Whether group buy threshold has been met
    private Integer remainingForGroupBuy; // Remaining quantity needed for group buy
}
