package com.doarmais.model.dto.response;

public class LoginResponse {
    public long id;
    public String nome;
    public boolean isAdmin;

    public LoginResponse(String nome, long id, boolean isAdmin) {
        this.nome = nome;
        this.id = id;
        this.isAdmin = isAdmin;
    }
}