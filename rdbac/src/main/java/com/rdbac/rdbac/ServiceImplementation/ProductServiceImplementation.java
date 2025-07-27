package com.rdbac.rdbac.ServiceImplementation;

import com.rdbac.rdbac.Dto.ProductDto;
import com.rdbac.rdbac.Dto.ProductResponseDto;
import com.rdbac.rdbac.Pojos.App_User;
import com.rdbac.rdbac.Pojos.Order;
import com.rdbac.rdbac.Pojos.OrderItem;
import com.rdbac.rdbac.Pojos.Product;
import com.rdbac.rdbac.Repositry.App_User_Repositry;
import com.rdbac.rdbac.Repositry.OrderRepository;
import com.rdbac.rdbac.Repositry.ProductRepository;
import com.rdbac.rdbac.Service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductServiceImplementation implements ProductService {

    private final ProductRepository productRepository;
    private final App_User_Repositry appUserRepository;
    private final OrderRepository orderRepository;

    public ProductServiceImplementation(ProductRepository productRepository, 
                                       App_User_Repositry appUserRepository,
                                       OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.appUserRepository = appUserRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public Product createProduct(ProductDto productDto, String supplierPhoneNumber) {
        // Verify supplier exists and has SUPPLIER role
        App_User supplier = appUserRepository.findByPhoneNumber(supplierPhoneNumber)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        
        boolean hasSupplierRole = supplier.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_SUPPLIER"));
        
        if (!hasSupplierRole) {
            throw new RuntimeException("User does not have SUPPLIER role");
        }

        Product product = new Product();
        product.setProductId(UUID.randomUUID().toString());
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setCategory(productDto.getCategory());
        product.setSupplierPhoneNumber(supplierPhoneNumber);
        product.setSupplierName(supplier.getName() != null ? supplier.getName() : supplierPhoneNumber);
        product.setOrigin(productDto.getOrigin());
        product.setQualityGrade(productDto.getQualityGrade());
        product.setIndividualPrice(productDto.getIndividualPrice());
        product.setGroupBuyPrice(productDto.getGroupBuyPrice());
        product.setGroupBuyThreshold(productDto.getGroupBuyThreshold());
        product.setUnit(productDto.getUnit());
        product.setAvailableQuantity(productDto.getAvailableQuantity());
        product.setImageUrl(productDto.getImageUrl());
        product.setCreatedDate(new Date());
        product.setUpdatedDate(new Date());
        product.setIsActive(true);

        log.info("Creating product: {} for supplier: {}", product.getName(), supplierPhoneNumber);
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(String productId, ProductDto productDto, String supplierPhoneNumber) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getSupplierPhoneNumber().equals(supplierPhoneNumber)) {
            throw new RuntimeException("Unauthorized to update this product");
        }

        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setCategory(productDto.getCategory());
        product.setOrigin(productDto.getOrigin());
        product.setQualityGrade(productDto.getQualityGrade());
        product.setIndividualPrice(productDto.getIndividualPrice());
        product.setGroupBuyPrice(productDto.getGroupBuyPrice());
        product.setGroupBuyThreshold(productDto.getGroupBuyThreshold());
        product.setUnit(productDto.getUnit());
        product.setAvailableQuantity(productDto.getAvailableQuantity());
        product.setImageUrl(productDto.getImageUrl());
        product.setUpdatedDate(new Date());

        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(String productId, String supplierPhoneNumber) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getSupplierPhoneNumber().equals(supplierPhoneNumber)) {
            throw new RuntimeException("Unauthorized to delete this product");
        }

        productRepository.delete(product);
    }

    @Override
    public List<ProductResponseDto> getAllActiveProducts() {
        List<Product> products = productRepository.findByIsActiveTrue();
        return products.stream()
                .map(this::convertToProductResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDto> getProductsByCategory(String category) {
        List<Product> products = productRepository.findByCategoryAndIsActiveTrue(category);
        return products.stream()
                .map(this::convertToProductResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDto> getProductsBySupplier(String supplierPhoneNumber) {
        List<Product> products = productRepository.findBySupplierPhoneNumberAndIsActiveTrue(supplierPhoneNumber);
        return products.stream()
                .map(this::convertToProductResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDto getProductById(String productId) {
        Product product = productRepository.findByProductIdAndIsActiveTrue(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToProductResponseDto(product);
    }

    @Override
    public List<ProductResponseDto> searchProducts(String searchTerm) {
        log.info(searchTerm);
        List<Product> products = productRepository.findByNameContainingIgnoreCaseAndIsActiveTrue(searchTerm);
        return products.stream()
                .map(this::convertToProductResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public void updateProductQuantity(String productId, Integer newQuantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setAvailableQuantity(newQuantity);
        product.setUpdatedDate(new Date());
        productRepository.save(product);
    }

    @Override
    public void deactivateProduct(String productId, String supplierPhoneNumber) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getSupplierPhoneNumber().equals(supplierPhoneNumber)) {
            throw new RuntimeException("Unauthorized to deactivate this product");
        }

        product.setIsActive(false);
        product.setUpdatedDate(new Date());
        productRepository.save(product);
    }

    private ProductResponseDto convertToProductResponseDto(Product product) {
        ProductResponseDto dto = new ProductResponseDto();
        dto.setProductId(product.getProductId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setCategory(product.getCategory());
        dto.setSupplierName(product.getSupplierName());
        dto.setOrigin(product.getOrigin());
        dto.setQualityGrade(product.getQualityGrade());
        dto.setIndividualPrice(product.getIndividualPrice());
        dto.setGroupBuyPrice(product.getGroupBuyPrice());
        dto.setGroupBuyThreshold(product.getGroupBuyThreshold());
        dto.setUnit(product.getUnit());
        dto.setAvailableQuantity(product.getAvailableQuantity());
        dto.setImageUrl(product.getImageUrl());

        // Calculate group buy progress
        calculateGroupBuyProgress(dto, product);

        return dto;
    }

    private void calculateGroupBuyProgress(ProductResponseDto dto, Product product) {
        // Get today's orders for this product
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

        List<Order> todaysOrders = orderRepository.findByOrderDateBetween(startOfDay, startOfNextDay);
        
        int currentGroupQuantity = todaysOrders.stream()
                .flatMap(order -> order.getOrderItems().stream())
                .filter(item -> item.getProductId().equals(product.getProductId()))
                .mapToInt(OrderItem::getQuantity)
                .sum();

        dto.setCurrentGroupQuantity(currentGroupQuantity);
        
        if (product.getGroupBuyThreshold() != null && product.getGroupBuyThreshold() > 0) {
            double progressPercentage = (double) currentGroupQuantity / product.getGroupBuyThreshold() * 100;
            dto.setGroupBuyProgressPercentage(Math.min(progressPercentage, 100.0));
            dto.setGroupBuyAchieved(currentGroupQuantity >= product.getGroupBuyThreshold());
            dto.setRemainingForGroupBuy(Math.max(0, product.getGroupBuyThreshold() - currentGroupQuantity));
        } else {
            dto.setGroupBuyProgressPercentage(0.0);
            dto.setGroupBuyAchieved(false);
            dto.setRemainingForGroupBuy(0);
        }
    }
}
