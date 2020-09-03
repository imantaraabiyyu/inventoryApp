package com.code.restservice.entities;

import com.fasterxml.jackson.annotation.JsonValue;

public enum TransactionType {
    PURCHASE(0),
    SELL(1),
    PAYDAY(2);

    private final Integer value;

    private TransactionType(Integer value) {
        this.value = value;
    }

    public static TransactionType toEnum(Integer type) {
        for (TransactionType v : values()) {
            if (v.value.equals(type)) {
                return v;
            }
        }
        return null;
    }

    @JsonValue
    public Integer getValue() {
        return value;
    }
}
