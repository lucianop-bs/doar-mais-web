package com.doarmais.controller;

import com.doarmais.model.bo.UsuarioBO;
import com.doarmais.model.dto.request.CadastroRequest;
import com.doarmais.model.dto.request.UsuarioUpdateRequest;
import com.doarmais.model.dto.response.CadastraUsuarioResponse;
import com.doarmais.model.dto.response.UsuarioResponse;
import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.resteasy.reactive.ResponseStatus;

import java.util.List;

@Path("/usuarios")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UsuarioController {
    @Inject
    UsuarioBO usuarioBO;

    @Inject
    JsonWebToken jwt;

    @POST
    @ResponseStatus(201)
    public CadastraUsuarioResponse criarUsuario(CadastroRequest request) {
        return usuarioBO.criarUsuario(request);
    }

    @GET
    @RolesAllowed("ADMIN")
    public List<UsuarioResponse> listarTodos() {
        return usuarioBO.listarTodos();
    }

    @GET
    @Path("/me")
    @Authenticated
    public UsuarioResponse buscarMe() {
        return usuarioBO.buscarPorEmail(jwt.getSubject());
    }

    @PUT
    @Path("/{id}")
    @Authenticated
    public UsuarioResponse atualizar(@PathParam("id") Long id, UsuarioUpdateRequest request) {
        return usuarioBO.atualizar(id, request, jwt.getSubject(), jwt.getGroups().contains("ADMIN"));
    }

    @DELETE
    @Path("/{id}")
    @Authenticated
    @ResponseStatus(204)
    public void excluir(@PathParam("id") Long id) {
        usuarioBO.excluir(id, jwt.getSubject(), jwt.getGroups().contains("ADMIN"));
    }
}
