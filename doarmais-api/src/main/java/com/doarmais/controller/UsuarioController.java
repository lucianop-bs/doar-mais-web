package com.doarmais.controller;

import com.doarmais.model.bo.UsuarioBO;
import com.doarmais.model.dto.request.CadastroRequest;
import com.doarmais.model.dto.response.CadastraUsuarioResponse;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.ResponseStatus;

@Path("/usuarios")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UsuarioController {
    @Inject
    UsuarioBO usuarioBO;

    @POST
    @ResponseStatus(201)
    public CadastraUsuarioResponse criarUsuario(CadastroRequest request) {
        return usuarioBO.criarUsuario(request);
    }
}
