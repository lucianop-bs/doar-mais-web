package com.doarmais.model.dto.response;

import java.time.LocalDateTime;

public class AuditLogResponse {
    public Long id;
    public String usuario;
    public String acao;
    public Integer statusHttp;
    public String ip;
    public LocalDateTime dataHora;

    public AuditLogResponse(Long id, String usuario, String acao, Integer statusHttp, String ip, LocalDateTime dataHora) {
        this.id = id;
        this.usuario = usuario;
        this.acao = acao;
        this.statusHttp = statusHttp;
        this.ip = ip;
        this.dataHora = dataHora;
    }
}