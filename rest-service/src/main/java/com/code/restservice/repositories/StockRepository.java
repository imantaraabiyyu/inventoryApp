package com.code.restservice.repositories;

import com.code.restservice.entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository
    extends JpaRepository<Stock, Integer>, StockRepositoryCustom {}
