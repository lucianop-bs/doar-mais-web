package com.doarmais.model.dto.response;

import java.time.LocalDate;

public class DistribuicaoResponse {
    public Long id;
    public String beneficiario;
    public int quantidadeCestas;
    public String usuarioNome;
    public LocalDate dataDistribuicao;

    public DistribuicaoResponse(Long id, String beneficiario, int quantidadeCestas, String usuarioNome, LocalDate dataDistribuicao) {
        this.id = id;
        this.beneficiario = beneficiario;
        this.quantidadeCestas = quantidadeCestas;
        this.usuarioNome = usuarioNome;
        this.dataDistribuicao = dataDistribuicao;
    }
}
