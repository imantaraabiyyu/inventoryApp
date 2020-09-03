package com.code.restservice.repositories;

import com.code.restservice.entities.Transaction;
import com.code.restservice.entities.TransactionType;
import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository
    extends JpaRepository<Transaction, Integer>, TransactionRepositoryCustom {
    public Page<Transaction> findByTypeLikeAndCreatedDateBetween(
        TransactionType type,
        LocalDateTime start,
        LocalDateTime end,
        Pageable pageable
    );

    public Page<Transaction> findByCreatedDateBetween(
        LocalDateTime start,
        LocalDateTime end,
        Pageable pageable
    );
}
