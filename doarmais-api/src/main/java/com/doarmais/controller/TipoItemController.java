package com.doarmais.controller;

import com.doarmais.model.dao.TipoItemDAO;
import com.doarmais.model.dto.response.TipoItemResponse;
import com.doarmais.model.entity.TipoItemEntity;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/tipos-item")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class TipoItemController {

    @Inject
    TipoItemDAO tipoItemDAO;

    @GET
    public List<TipoItemResponse> listar() {
        return tipoItemDAO.listAll().stream()
                .map(this::toResponse)
                .toList();
    }

    private TipoItemResponse toResponse(TipoItemEntity t) {
        return new TipoItemResponse(t.getId(), t.getNome(), t.getDescricao());
    }
}
