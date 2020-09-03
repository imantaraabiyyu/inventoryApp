package com.code.restservice.repositories;

import com.code.restservice.dto.TransactionSummary;
import java.time.LocalDate;
import java.util.List;

public interface TransactionRepositoryCustom {
    public List<TransactionSummary> summary(LocalDate from, LocalDate to);
}
