package com.rdbac.rdbac.Repositry;

import com.rdbac.rdbac.Pojos.Order;
import com.rdbac.rdbac.Pojos.OrderStatus;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    
    List<Order> findByVendorPhoneNumber(String vendorPhoneNumber);
    List<Order> findBySupplierPhoneNumber(String supplierPhoneNumber);
    List<Order> findByStatus(OrderStatus status);
    List<Order> findBySupplierPhoneNumberAndStatus(String supplierPhoneNumber, com.rdbac.rdbac.Pojos.Enums.OrderStatus status);
    List<Order> findByVendorPhoneNumberAndStatus(String vendorPhoneNumber, com.rdbac.rdbac.Pojos.Enums.OrderStatus orderStatus);
    
    @Query("{'orderDate': {'$gte': ?0, '$lt': ?1}}")
    List<Order> findByOrderDateBetween(Date startDate, Date endDate);
    
    @Query("{'supplierPhoneNumber': ?0, 'orderDate': {'$gte': ?1, '$lt': ?2}}")
    List<Order> findBySupplierPhoneNumberAndOrderDateBetween(String supplierPhoneNumber, Date startDate, Date endDate);
    
    @Query("{'orderDate': {'$gte': ?0, '$lt': ?1}, 'status': ?2}")
    List<Order> findByOrderDateBetweenAndStatus(Date startDate, Date endDate, OrderStatus status);
    List<Order> findBySupplierPhoneNumberAndStatus(String supplierPhoneNumber, OrderStatus pending);
}
