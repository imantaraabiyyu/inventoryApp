package com.code.restservice.services.impl;

import com.code.restservice.dto.StockSummary;
import com.code.restservice.entities.Stock;
import com.code.restservice.exceptions.EntityNotFoundException;
import com.code.restservice.repositories.StockRepository;
import com.code.restservice.services.StockService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class StockServiceImpl
    extends CommonServiceImpl<Stock, Integer>
    implements StockService {
    @Autowired
    private StockRepository repository;

    @Override
    public List<StockSummary> StockSummary() {
        List<StockSummary> data = repository.StockSummary();
        if (data.isEmpty()) {
            throw new EntityNotFoundException();
        }
        return data;
    }

    @Override
    protected JpaRepository<Stock, Integer> getRepository() {
        return repository;
    }
}
