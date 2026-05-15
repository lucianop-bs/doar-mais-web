package com.doarmais.model.bo;

import com.doarmais.model.entity.UsuarioEntity;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Duration;

@ApplicationScoped
public class TokenBO {
    public String gerarToken(UsuarioEntity usuario) {
        String role = usuario.isAdmin() ? "ADMIN" : "USER";
        
        return Jwt
                .issuer("doarmais-api")
                .subject(usuario.getEmail())
                .groups(role)
                .claim("nome", usuario.getNome())
                .claim("id", usuario.getId())
                .claim("isAdmin", usuario.isAdmin())
                .claim("isBeneficiario", usuario.isBeneficiario())
                .expiresIn(Duration.ofHours(8))
                .sign();
    }
}
