package com.doarmais.model.dto.response;

public class UsuarioResponse {
    public Long id;
    public String nome;
    public String email;
    public boolean isAdmin;
    public boolean isBeneficiario;

    public UsuarioResponse(Long id, String nome, String email, boolean isAdmin, boolean isBeneficiario) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.isAdmin = isAdmin;
        this.isBeneficiario = isBeneficiario;
    }
}
