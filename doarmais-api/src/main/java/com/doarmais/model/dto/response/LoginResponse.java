package com.doarmais.model.dto.response;

public class LoginResponse {
    public long id;
    public String nome;
    public String token;
    public boolean isAdmin;

    public LoginResponse(String token, String nome, long id, boolean isAdmin) {
        this.token = token;
        this.nome = nome;
        this.id = id;
        this.isAdmin = isAdmin;
    }
}
