package com.rdbac.rdbac.Service;

import com.rdbac.rdbac.Dto.ProductDto;
import com.rdbac.rdbac.Dto.ProductResponseDto;
import com.rdbac.rdbac.Pojos.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductDto productDto, String supplierPhoneNumber);
    Product updateProduct(String productId, ProductDto productDto, String supplierPhoneNumber);
    void deleteProduct(String productId, String supplierPhoneNumber);
    List<ProductResponseDto> getAllActiveProducts();
    List<ProductResponseDto> getProductsByCategory(String category);
    List<ProductResponseDto> getProductsBySupplier(String supplierPhoneNumber);
    ProductResponseDto getProductById(String productId);
    List<ProductResponseDto> searchProducts(String searchTerm);
    void updateProductQuantity(String productId, Integer newQuantity);
    void deactivateProduct(String productId, String supplierPhoneNumber);
}
