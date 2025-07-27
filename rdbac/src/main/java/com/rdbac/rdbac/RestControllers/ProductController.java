package com.rdbac.rdbac.RestControllers;

import com.rdbac.rdbac.Dto.ProductDto;
import com.rdbac.rdbac.Dto.ProductResponseDto;
import com.rdbac.rdbac.Pojos.Product;
import com.rdbac.rdbac.Service.ProductService;
import com.rdbac.rdbac.ServiceImplementation.ProductServiceImplementation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@Slf4j
public class ProductController {

    private final ProductServiceImplementation productService;

    public ProductController(ProductServiceImplementation productService) {
        this.productService = productService;
    }

    private String getCurrentUserPhoneNumber() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }
        throw new RuntimeException("User not authenticated");
    }

    // Supplier endpoints (ROLE_SUPPLIER required)
    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
        String supplierPhone = getCurrentUserPhoneNumber();
        Product product = productService.createProduct(productDto, supplierPhone);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable String productId, 
                                               @RequestBody ProductDto productDto) {
        String supplierPhone = getCurrentUserPhoneNumber();
        Product product = productService.updateProduct(productId, productDto, supplierPhone);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String productId) {
        String supplierPhone = getCurrentUserPhoneNumber();
        productService.deleteProduct(productId, supplierPhone);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{productId}/deactivate")
    public ResponseEntity<Void> deactivateProduct(@PathVariable String productId) {
        String supplierPhone = getCurrentUserPhoneNumber();
        productService.deactivateProduct(productId, supplierPhone);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{productId}/quantity")
    public ResponseEntity<Void> updateProductQuantity(@PathVariable String productId, 
                                                     @RequestParam Integer quantity) {
        productService.updateProductQuantity(productId, quantity);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my-products")
    public ResponseEntity<List<ProductResponseDto>> getMyProducts() {
        String supplierPhone = getCurrentUserPhoneNumber();
        List<ProductResponseDto> products = productService.getProductsBySupplier(supplierPhone);
        return ResponseEntity.ok(products);
    }

    // Vendor endpoints (accessible to both ROLE_SUPPLIER and ROLE_VENDOR)
    @GetMapping("/all")
    public ResponseEntity<List<ProductResponseDto>> getAllProducts() {
        List<ProductResponseDto> products = productService.getAllActiveProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductResponseDto>> getProductsByCategory(@PathVariable String category) {
        List<ProductResponseDto> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponseDto> getProductById(@PathVariable String productId) {
        ProductResponseDto product = productService.getProductById(productId);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductResponseDto>> searchProducts(@RequestParam String query) {
        List<ProductResponseDto> products = productService.searchProducts(query);
        return ResponseEntity.ok(products);
    }
}
