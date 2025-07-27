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
public class DailySummary {
    
    @Id
    private String summaryId;
    private String supplierPhoneNumber;
    private Date summaryDate;
    private List<ProductSummary> productSummaries;
    private Integer totalOrders;
    private Integer totalDeliveryPoints;
    private Double totalRevenue;
    private Date createdAt;
    private Boolean routeGenerated; // Whether delivery route has been generated
    private String routeUrl; // URL to the generated route (Google Maps, etc.)
}

@Data
@Getter
@Setter
class ProductSummary {
    private String productId;
    private String productName;
    private Integer totalQuantity;
    private String unit;
    private Integer individualOrdersCount;
    private Integer groupOrdersCount;
    private Double totalRevenue;
    private List<DeliveryPoint> deliveryPoints;
}

@Data
@Getter
@Setter
class DeliveryPoint {
    private String vendorPhoneNumber;
    private String vendorName;
    private String deliveryAddress;
    private String deliveryArea;
    private Integer quantity;
    private String orderId;
}
