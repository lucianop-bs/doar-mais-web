package com.doarmais.controller;

import com.doarmais.model.bo.LoginBO;
import com.doarmais.model.dto.request.LoginRequest;
import com.doarmais.model.dto.response.LoginResponse;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.ResponseStatus;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginController {
    @Inject
    LoginBO loginBO;

    @POST
    @Path("/login")
    @ResponseStatus(200)
    public LoginResponse login(LoginRequest request) {
        return loginBO.autenticar(request);
    }

}
