package com.doarmais.controller;

import com.doarmais.model.bo.AuditLogBO;
import com.doarmais.model.dto.response.AuditLogResponse;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/audit-logs")
@Produces(MediaType.APPLICATION_JSON)
public class AuditLogController {

    @Inject
    AuditLogBO auditLogBO;

    @GET
    @RolesAllowed("ADMIN")
    public List<AuditLogResponse> listar() {
        return auditLogBO.listar();
    }
}