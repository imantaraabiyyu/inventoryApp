package com.code.restservice.exceptions;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ResponseCodes {
    SUCCESS(1),
    UNKNOWN(0),
    PATH_NOT_FOUND(-1),
    ENTITY_NOT_FOUND(-2),
    INVALID_INPUT_FORMAT(-3),
    INVALID_MEDIA_TYPE_REQUEST(-4),
    FILE_NOT_FOUND(-5),
    ILLEGAL_ARGUMENT(-6);

    private final Integer value;

    private ResponseCodes(Integer value) {
        this.value = value;
    }

    @JsonValue
    public Integer getValue() {
        return value;
    }
}
