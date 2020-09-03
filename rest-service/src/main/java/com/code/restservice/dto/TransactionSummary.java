package com.code.restservice.dto;

import com.code.restservice.entities.TransactionType;
import com.code.restservice.validation.annotations.TypeAttributeConverter;
import javax.persistence.Convert;

public class TransactionSummary {
    private long amount;

    @Convert(converter = TypeAttributeConverter.class)
    private TransactionType type;

    private long count;

    public TransactionSummary(TransactionType type, long amount, long count) {
        this.amount = amount;
        this.type = type;
        this.count = count;
    }

    public long getAmount() {
        return this.amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public TransactionType getType() {
        return this.type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public long getCount() {
        return this.count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
