package com.code.restservice.models;

import com.code.restservice.exceptions.ResponseCodes;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;

public class ResponseModel<T> {
    private ResponseCodes code;
    private String message;
    private T data;

    @JsonFormat(shape = Shape.STRING, pattern = "dd:MM:yyy HH:mm:ss")
    private LocalDateTime timeStamp;

    private Integer status;

    private ResponseModel(
        Integer status,
        ResponseCodes code,
        String message,
        T data
    ) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
        this.timeStamp = LocalDateTime.now();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public ResponseCodes getCode() {
        return code;
    }

    public void setCode(ResponseCodes code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public LocalDateTime getTimeStamp() {
        return this.timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public static <T> ResponseModel<T> success(T data) {
        return new ResponseModel<>(
            HttpStatus.OK.value(),
            ResponseCodes.SUCCESS,
            "Success",
            data
        );
    }

    public static <T> ResponseModel<T> successAdd(T data) {
        return new ResponseModel<>(
            HttpStatus.CREATED.value(),
            ResponseCodes.SUCCESS,
            "Success",
            data
        );
    }

    public static <T> ResponseModel<T> error(
        HttpStatus httpStatus,
        ResponseCodes code,
        String message
    ) {
        return new ResponseModel<T>(httpStatus.value(), code, message, null);
    }

    public static <T> ResponseModel<T> error(
        HttpStatus httpStatus,
        ResponseCodes code,
        String message,
        T data
    ) {
        return new ResponseModel<T>(httpStatus.value(), code, message, data);
    }
}
