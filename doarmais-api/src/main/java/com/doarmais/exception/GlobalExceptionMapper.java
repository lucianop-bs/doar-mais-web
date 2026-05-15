package com.doarmais.exception;

import com.doarmais.model.dto.response.ErrorResponse;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class GlobalExceptionMapper implements ExceptionMapper<RuntimeException> {

    @Override
    public Response toResponse(RuntimeException exception) {
        ErrorResponse error = new ErrorResponse(exception.getMessage(), 400);
        return Response.status(Response.Status.BAD_REQUEST)
                .entity(error)
                .build();
    }
}
