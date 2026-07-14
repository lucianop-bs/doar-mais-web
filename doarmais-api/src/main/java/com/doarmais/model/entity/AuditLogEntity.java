package com.doarmais.model.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String usuario;

    @Column(nullable = false)
    private String acao;

    @Column(name = "status_http", nullable = false)
    private Integer statusHttp;

    private String ip;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    public AuditLogEntity() {}

    public AuditLogEntity(String usuario, String acao, Integer statusHttp, String ip) {
        this.usuario = usuario;
        this.acao = acao;
        this.statusHttp = statusHttp;
        this.ip = ip;
        this.dataHora = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getUsuario() { return usuario; }
    public String getAcao() { return acao; }
    public Integer getStatusHttp() { return statusHttp; }
    public String getIp() { return ip; }
    public LocalDateTime getDataHora() { return dataHora; }
}