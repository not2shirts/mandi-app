package com.rdbac.rdbac.Service;

import com.rdbac.rdbac.Pojos.DailySummary;

import java.util.Date;
import java.util.List;

public interface DailySummaryService {
    void generateDailySummary(Date summaryDate);
    DailySummary getDailySummaryBySupplier(String supplierPhoneNumber, Date summaryDate);
    List<DailySummary> getDailySummariesBySupplier(String supplierPhoneNumber);
    String generateDeliveryRoute(String supplierPhoneNumber, Date summaryDate);
    List<DailySummary> getPendingRouteSummaries();
}
