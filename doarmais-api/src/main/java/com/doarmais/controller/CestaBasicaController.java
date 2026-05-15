package com.doarmais.controller;

import com.doarmais.model.bo.CestaBasicaBO;
import com.doarmais.model.dto.mapper.EstoqueMapper;
import com.doarmais.model.dto.request.DistribuicaoRequest;
import com.doarmais.model.dto.response.DistribuicaoResponse;
import com.doarmais.model.dto.response.EstoqueResponse;
import com.doarmais.model.dto.response.TotalCestasResponse;
import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.ResponseStatus;

import java.util.List;

@Path("/cestas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class CestaBasicaController {

    @Inject
    CestaBasicaBO cestaBasicaBO;

    @GET
    @Path("/estoque")
    public List<EstoqueResponse> listarEstoque() {
        return EstoqueMapper.toResponseList(cestaBasicaBO.listarEstoque());
    }

    @GET
    @Path("/total")
    public TotalCestasResponse calcularTotalCestas() {
        return new TotalCestasResponse(cestaBasicaBO.calcularTotalCestas());
    }

    @POST
    @Path("/distribuir")
    @ResponseStatus(201)
    public void distribuirCestas(DistribuicaoRequest request) {
        cestaBasicaBO.distribuirCestas(request);
    }

    @GET
    @Path("/distribuicoes")
    public List<DistribuicaoResponse> listarDistribuicoes() {
        return cestaBasicaBO.listarDistribuicoes();
    }
}
