package com.doarmais.model.dto.response;

import java.time.LocalDate;

public class DoacaoResponse {
    public Long id;
    public String item;
    public Integer quantidade;
    public String doador;
    public LocalDate data;

    public DoacaoResponse(Long id, String item, Integer quantidade,
                          String doador, LocalDate data) {
        this.id = id;
        this.item = item;
        this.quantidade = quantidade;
        this.doador = doador;
        this.data = data;
    }
}