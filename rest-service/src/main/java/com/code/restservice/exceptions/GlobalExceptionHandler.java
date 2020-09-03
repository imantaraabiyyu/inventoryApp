package com.code.restservice.exceptions;

import com.code.restservice.models.ResponseModel;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import javax.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @Autowired
    private MessageSource messageSource;

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        MethodArgumentNotValidException e,
        HttpHeaders headers,
        HttpStatus status,
        WebRequest request
    ) {
        Map<String, List<String>> errors = new HashMap<>();
        e
            .getBindingResult()
            .getFieldErrors()
            .forEach(
                fieldError -> {
                    String field = fieldError.getField();
                    String message = fieldError.getDefaultMessage();

                    List<String> messages = errors.get(field);
                    if (messages == null) {
                        messages = new ArrayList<>();

                        errors.put(field, messages);
                    }

                    messages.add(message);
                }
            );

        String message = messageSource.getMessage(
            "argument.not.valid",
            null,
            LocaleContextHolder.getLocale()
        );
        ResponseModel<Object> body = ResponseModel.error(
            HttpStatus.BAD_REQUEST,
            ResponseCodes.INVALID_INPUT_FORMAT,
            message,
            errors
        );
        return ResponseEntity.ok(body);
    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
        HttpRequestMethodNotSupportedException e,
        HttpHeaders headers,
        HttpStatus status,
        WebRequest request
    ) {
        ResponseModel<Object> body = ResponseModel.error(
            HttpStatus.BAD_REQUEST,
            ResponseCodes.PATH_NOT_FOUND,
            e.getLocalizedMessage()
        );
        return ResponseEntity.ok(body);
    }

    @ExceptionHandler({ ConstraintViolationException.class })
    public ResponseEntity<ResponseModel<Object>> handleConstraintViolation(
        ConstraintViolationException e,
        WebRequest request
    ) {
        ResponseModel<Object> body = ResponseModel.error(
            HttpStatus.BAD_REQUEST,
            ResponseCodes.PATH_NOT_FOUND,
            "file media type not supported."
        );
        return ResponseEntity.ok(body);
    }

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ResponseModel<Object>> handleApplicationException(
        ApplicationException e
    ) {
        String message = messageSource.getMessage(
            e.getMessage(),
            null,
            LocaleContextHolder.getLocale()
        );
        ResponseModel<Object> body = ResponseModel.error(
            e.getStatus(),
            e.getCode(),
            message
        );
        return ResponseEntity.ok(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseModel<Object>> handleUnknownException(
        Exception e,
        Locale locale
    ) {
        ResponseModel<Object> body = ResponseModel.error(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ResponseCodes.UNKNOWN,
            e.getMessage()
        );
        return ResponseEntity.ok(body);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(
        HttpMediaTypeNotSupportedException e,
        HttpHeaders headers,
        HttpStatus status,
        WebRequest request
    ) {
        StringBuilder builder = new StringBuilder();
        builder.append(e.getContentType());
        builder.append(
            " media type is not supported. Supported media types are "
        );
        e.getSupportedMediaTypes().forEach(t -> builder.append(t + ", "));

        ResponseModel<Object> body = ResponseModel.error(
            HttpStatus.BAD_REQUEST,
            ResponseCodes.INVALID_MEDIA_TYPE_REQUEST,
            builder.substring(0, builder.length() - 2)
        );
        return ResponseEntity.ok(body);
    }
}
