package com.doarmais.filter;

import com.doarmais.model.bo.AuditLogBO;
import io.vertx.ext.web.RoutingContext;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.ext.Provider;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;

@Provider
public class AuditoriaFilter implements ContainerResponseFilter {

    private static final Logger LOG = Logger.getLogger(AuditoriaFilter.class);

    @Inject
    AuditLogBO auditLogBO;

    @Inject
    JsonWebToken jwt;

    @Context
    RoutingContext routingContext;

    @Override
    public void filter(ContainerRequestContext req, ContainerResponseContext res) {
        try {
            String path = req.getUriInfo().getPath();

            if (path.startsWith("q/") || path.startsWith("swagger") || path.startsWith("openapi")) {
                return;
            }

            String usuario = usuarioSubject();
            String acao = req.getMethod() + path;
            String ip = extrairIp(req);

            auditLogBO.registrar(usuario, acao, res.getStatus(), ip);
        } catch (Exception e) {
            LOG.warnf(e, "Falha ao registrar log de auditoria");
        }
    }

    private String usuarioSubject() {
        try {
            return jwt.getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    private String extrairIp(ContainerRequestContext req) {
        String forwarded = req.getHeaderString("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        if (routingContext != null && routingContext.request() != null
                && routingContext.request().remoteAddress() != null) {
            return routingContext.request().remoteAddress().host();
        }
        return null;
    }
}