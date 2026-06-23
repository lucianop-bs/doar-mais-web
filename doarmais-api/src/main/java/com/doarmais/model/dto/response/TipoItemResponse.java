package com.doarmais.model.dto.response;

public class TipoItemResponse {
    public Long id;
    public String nome;
    public String descricao;

    public TipoItemResponse(Long id, String nome, String descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }
}
