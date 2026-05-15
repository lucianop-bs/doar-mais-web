package com.doarmais.model.dto.response;

public class EstoqueResponse {
    public String item;
    public int quantidade;

    public EstoqueResponse(String item, int quantidade) {
        this.item = item;
        this.quantidade = quantidade;
    }

}
