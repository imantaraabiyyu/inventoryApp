package com.code.restservice.services.impl;

import com.code.restservice.dto.TransactionSummary;
import com.code.restservice.entities.Transaction;
import com.code.restservice.entities.TransactionType;
import com.code.restservice.models.TransactionSummaryModel;
import com.code.restservice.repositories.TransactionRepository;
import com.code.restservice.services.TransactionService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.Year;
import java.time.temporal.TemporalAdjusters;
import java.util.Arrays;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Transactional
@Service
public class TransactionServiceImpl
    extends CommonServiceImpl<Transaction, Integer>
    implements TransactionService {
    @Autowired
    private TransactionRepository repository;

    @Override
    public TransactionSummaryModel summary(
        Year year,
        Month month,
        Integer date
    ) {
        LocalDate from = LocalDate.of(year.getValue(), 1, 1);
        LocalDate to = LocalDate.of(year.getValue(), 12, 1);

        if (month != null) {
            from = from.withMonth(month.getValue());
            to = to.withMonth(month.getValue());
        }

        if (date != null) {
            from = from.withDayOfMonth(1);
            to = to.withDayOfMonth(date);
        } else {
            from = from.withDayOfMonth(1);
            to = to.with(TemporalAdjusters.lastDayOfMonth());
        }
        List<TransactionSummary> summary = repository.summary(from, to);

        TransactionSummaryModel transactionSummary = new TransactionSummaryModel(
            summary,
            from,
            to
        );
        return transactionSummary;
    }

    @Override
    public List<TransactionSummary> annual(Year year, Month month) {
        LocalDate from = LocalDate.of(year.getValue(), 1, 1);
        LocalDate to = LocalDate.of(year.getValue(), 12, 1);

        if (month != null) {
            from = from.withMonth(month.getValue());
            to = to.withMonth(month.getValue());
        }

        from = from.withDayOfMonth(1);
        to = to.with(TemporalAdjusters.lastDayOfMonth());

        List<TransactionSummary> summary = repository.summary(from, to);

        return summary;
    }

    @Override
    protected JpaRepository<Transaction, Integer> getRepository() {
        return repository;
    }

    @Override
    public Page<Transaction> findFiltered(
        Integer type,
        String from,
        String to,
        Direction sort,
        Integer page,
        Integer size
    ) {
        String[] fromDate = from.split("-");
        String[] toDate = to.split("-");

        int[] setFromDate = Arrays
            .stream(fromDate)
            .mapToInt(Integer::parseInt)
            .toArray();
        int[] setToDate = Arrays
            .stream(toDate)
            .mapToInt(Integer::parseInt)
            .toArray();

        LocalDateTime setFrom = LocalDateTime.of(
            setFromDate[0],
            setFromDate[1],
            setFromDate[2],
            23,
            59
        );
        LocalDateTime SetTo = LocalDateTime.of(
            setToDate[0],
            setToDate[1],
            setToDate[2],
            23,
            59
        );

        Sort s = Sort.Direction.DESC.equals(sort)
            ? Sort.by("id").descending()
            : Sort.by("id");

        if (type >= 0 && type <= 3) {
            TransactionType setType = TransactionType.toEnum(type);

            Page<Transaction> data = repository.findByTypeLikeAndCreatedDateBetween(
                setType,
                setFrom,
                SetTo,
                PageRequest.of(page, size, s)
            );

            return data;
        } else {
            Page<Transaction> data = repository.findByCreatedDateBetween(
                setFrom,
                SetTo,
                PageRequest.of(page, size, s)
            );

            return data;
        }
    }
}
