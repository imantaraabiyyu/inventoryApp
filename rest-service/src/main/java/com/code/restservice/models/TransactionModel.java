package com.code.restservice.models;

import com.code.restservice.entities.TransactionType;
import com.code.restservice.validation.annotations.MinLength;
import javax.validation.constraints.NotBlank;

public class TransactionModel {
    private Integer id;

    private Integer amount;

    private TransactionType type;

    private String createdDate;

    @MinLength(2)
    @NotBlank(message = "{description.not.blank}")
    private String description;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAmount() {
        return this.amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public TransactionType getType() {
        return this.type;
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

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }
}
