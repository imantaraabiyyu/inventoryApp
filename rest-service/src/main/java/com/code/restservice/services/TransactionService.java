package com.code.restservice.services;

import com.code.restservice.dto.TransactionSummary;
import com.code.restservice.entities.Transaction;
import com.code.restservice.models.TransactionSummaryModel;
import java.time.Month;
import java.time.Year;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort.Direction;

public interface TransactionService
    extends CommonService<Transaction, Integer> {
    public Page<Transaction> findFiltered(
        Integer type,
        String from,
        String to,
        Direction sort,
        Integer page,
        Integer size
    );

    public TransactionSummaryModel summary(
        Year year,
        Month month,
        Integer date
    );

    public List<TransactionSummary> annual(Year year, Month month);
}
