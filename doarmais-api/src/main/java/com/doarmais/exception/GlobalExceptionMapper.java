package com.doarmais.exception;

import com.doarmais.model.dto.response.ErrorResponse;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.jboss.logging.Logger;

@Provider
public class GlobalExceptionMapper implements ExceptionMapper<RuntimeException> {

    private static final Logger LOG = Logger.getLogger(GlobalExceptionMapper.class);

    @Override
    public Response toResponse(RuntimeException exception) {
        LOG.errorf(exception, "Erro tratado pela API: %s", exception.getMessage());
        ErrorResponse error = new ErrorResponse(exception.getMessage(), 400);
        return Response.status(Response.Status.BAD_REQUEST)
                .entity(error)
                .build();
    }
}