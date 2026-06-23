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
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;

import java.time.Duration;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginController {
    @Inject
    LoginBO loginBO;

    @POST
    @Path("/login")
    public Response login(LoginRequest request) {
        LoginResponse data = loginBO.autenticar(request);

        NewCookie tokenCookie = new NewCookie.Builder("token")
                .value(data.token)
                .path("/")
                .httpOnly(true)
                .secure(false)
                .sameSite(NewCookie.SameSite.STRICT)
                .maxAge((int) Duration.ofHours(8).toSeconds())
                .build();

        data.token = null;

        return Response.ok(data).cookie(tokenCookie).build();
    }

    @POST
    @Path("/logout")
    public Response logout() {
        NewCookie expired = new NewCookie.Builder("token")
                .value("")
                .path("/")
                .httpOnly(true)
                .maxAge(0)
                .build();
        return Response.noContent().cookie(expired).build();
    }
}
