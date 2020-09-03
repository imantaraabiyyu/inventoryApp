package com.code.restservice.exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.context.request.WebRequest;

public class RequestMethodNotSupportedException extends GlobalExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
        HttpRequestMethodNotSupportedException ex,
        HttpHeaders headers,
        HttpStatus status,
        WebRequest request
    ) {
        return super.handleHttpRequestMethodNotSupported(
            ex,
            headers,
            status,
            request
        );
    }
}
