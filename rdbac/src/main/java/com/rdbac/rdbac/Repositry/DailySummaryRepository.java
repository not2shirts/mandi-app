package com.rdbac.rdbac.Repositry;

import com.rdbac.rdbac.Pojos.DailySummary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailySummaryRepository extends MongoRepository<DailySummary, String> {
    
    Optional<DailySummary> findBySupplierPhoneNumberAndSummaryDate(String supplierPhoneNumber, Date summaryDate);
    List<DailySummary> findBySupplierPhoneNumber(String supplierPhoneNumber);
    List<DailySummary> findBySummaryDate(Date summaryDate);
    List<DailySummary> findByRouteGeneratedFalse();
    
    @Query("{'summaryDate': {'$gte': ?0, '$lt': ?1}}")
    List<DailySummary> findBySummaryDateBetween(Date startDate, Date endDate);
    
    @Query("{'supplierPhoneNumber': ?0, 'summaryDate': {'$gte': ?1, '$lt': ?2}}")
    List<DailySummary> findBySupplierPhoneNumberAndSummaryDateBetween(String supplierPhoneNumber, Date startDate, Date endDate);
}
