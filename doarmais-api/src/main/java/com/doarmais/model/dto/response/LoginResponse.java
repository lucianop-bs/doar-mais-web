package com.doarmais.model.dto.response;

public class LoginResponse {
    public long id;
    public String nome;
    public String token;

    public LoginResponse(String token, String nome, long id) {
        this.token = token;
        this.nome = nome;
        this.id = id;
    }
}
