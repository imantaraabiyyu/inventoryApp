package com.code.restservice.services;

import com.code.restservice.dto.StockSummary;
import com.code.restservice.entities.Stock;
import java.util.List;

public interface StockService extends CommonService<Stock, Integer> {
    public List<StockSummary> StockSummary();
}
