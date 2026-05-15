package com.doarmais.model.dto.response;

public class ErrorResponse {
    public String message;
    public int status;

    public ErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
