package com.code.restservice.exceptions;

import org.springframework.http.HttpStatus;

public class ApplicationException extends RuntimeException {
    private static final long serialVersionUID = -4768900513366139069L;
    private final ResponseCodes code;
    private final HttpStatus status;

    public ApplicationException(
        HttpStatus status,
        String message,
        ResponseCodes code
    ) {
        super(message);
        this.status = status;
        this.code = code;
    }

    public ApplicationException(
        HttpStatus status,
        Throwable cause,
        ResponseCodes code
    ) {
        super(cause);
        this.status = status;
        this.code = code;
    }

    public ApplicationException(
        HttpStatus status,
        String message,
        Throwable cause,
        ResponseCodes code
    ) {
        super(message, cause);
        this.status = status;
        this.code = code;
    }

    public ResponseCodes getCode() {
        return code;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
