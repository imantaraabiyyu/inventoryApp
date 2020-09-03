package com.code.restservice.entities;

import com.code.restservice.validation.annotations.TypeAttributeConverter;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "transaction")
@Entity
public class Transaction extends AbstractEntity {
    @Column(name = "amount", nullable = false, length = 10)
    private Integer amount;

    @Convert(converter = TypeAttributeConverter.class)
    private TransactionType type;

    @Column(name = "description", length = 200)
    private String description;

    public Transaction() {}

    public Transaction(
        Integer amount,
        TransactionType type,
        String description
    ) {
        this.amount = amount;
        this.type = type;
        this.description = description;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
