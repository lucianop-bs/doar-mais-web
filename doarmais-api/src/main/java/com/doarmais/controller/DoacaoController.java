package com.doarmais.controller;

import com.doarmais.model.bo.DoacaoBO;
import com.doarmais.model.dto.request.DoacaoRequest;
import com.doarmais.model.dto.response.DoacaoResponse;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.ResponseStatus;

import java.util.List;

@Path("/doacoes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class DoacaoController {
    @Inject
    DoacaoBO doacaoBO;

    @POST
    @ResponseStatus(201)
    public void criarDoacao(List<DoacaoRequest> request) {
        doacaoBO.criarDoacao(request);
    }

    @GET
    @ResponseStatus(200)
    public List<DoacaoResponse> listarDoacoes() {
        return doacaoBO.listarDoacoes();
    }
}
