package com.code.restservice.exceptions;

import org.springframework.http.HttpStatus;

public class FileNotFoundException extends ApplicationException {
    private static final long serialVersionUID = 6319928901151338347L;

    public FileNotFoundException() {
        super(
            HttpStatus.NOT_FOUND,
            "exception.file.not.found",
            ResponseCodes.FILE_NOT_FOUND
        );
    }
}
