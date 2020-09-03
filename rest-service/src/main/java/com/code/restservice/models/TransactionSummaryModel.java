package com.code.restservice.models;

import com.code.restservice.dto.TransactionSummary;
import java.time.LocalDate;
import java.util.List;

public class TransactionSummaryModel {
    private List<TransactionSummary> summary;

    private LocalDate from;
    private LocalDate to;

    public TransactionSummaryModel(
        List<TransactionSummary> summary,
        LocalDate from,
        LocalDate to
    ) {
        this.summary = summary;
        this.from = from;
        this.to = to;
    }

    public List<TransactionSummary> getSummary() {
        return this.summary;
    }

    public void setSummary(List<TransactionSummary> summary) {
        this.summary = summary;
    }

    public LocalDate getFrom() {
        return from;
    }

    public void setFrom(LocalDate from) {
        this.from = from;
    }

    public LocalDate getTo() {
        return to;
    }

    public void setTo(LocalDate to) {
        this.to = to;
    }
}
