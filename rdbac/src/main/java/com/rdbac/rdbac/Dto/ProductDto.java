package com.rdbac.rdbac.Dto;

import lombok.Data;

@Data
public class ProductDto {
    private String name;
    private String description;
    private String category;
    private String origin;
    private String qualityGrade;
    private Double individualPrice;
    private Double groupBuyPrice;
    private Integer groupBuyThreshold;
    private String unit;
    private Integer availableQuantity;
    private String imageUrl;
}
