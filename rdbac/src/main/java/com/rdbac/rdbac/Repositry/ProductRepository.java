package com.rdbac.rdbac.Repositry;

import com.rdbac.rdbac.Pojos.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    
    List<Product> findBySupplierPhoneNumber(String supplierPhoneNumber);
    List<Product> findByIsActiveTrue();
    List<Product> findByCategory(String category);
    List<Product> findByCategoryAndIsActiveTrue(String category);
    List<Product> findBySupplierPhoneNumberAndIsActiveTrue(String supplierPhoneNumber);
    Optional<Product> findByProductIdAndIsActiveTrue(String productId);
    List<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);
}
