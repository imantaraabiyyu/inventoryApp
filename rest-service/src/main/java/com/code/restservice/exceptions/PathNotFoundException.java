package com.code.restservice.exceptions;

import org.springframework.http.HttpStatus;

public class PathNotFoundException extends ApplicationException {
    private static final long serialVersionUID = 1L;

    public PathNotFoundException() {
        super(
            HttpStatus.NOT_FOUND,
            "exception.path.not.found",
            ResponseCodes.PATH_NOT_FOUND
        );
    }
}
