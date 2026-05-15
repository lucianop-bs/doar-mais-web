package com.doarmais.model.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "distribuicoes")
public class DistribuicaoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String beneficiario;
    
    @Column(name = "quantidade_cestas", nullable = false)
    private Integer quantidadeCestas;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioEntity usuario;
    
    @Column(name = "data_distribuicao", nullable = false)
    private LocalDate dataDistribuicao;

    public DistribuicaoEntity() {}

    public DistribuicaoEntity(String beneficiario, Integer quantidadeCestas, UsuarioEntity usuario) {
        this.beneficiario = beneficiario;
        this.quantidadeCestas = quantidadeCestas;
        this.usuario = usuario;
        this.dataDistribuicao = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBeneficiario() {
        return beneficiario;
    }

    public void setBeneficiario(String beneficiario) {
        this.beneficiario = beneficiario;
    }

    public Integer getQuantidadeCestas() {
        return quantidadeCestas;
    }

    public void setQuantidadeCestas(Integer quantidadeCestas) {
        this.quantidadeCestas = quantidadeCestas;
    }

    public UsuarioEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioEntity usuario) {
        this.usuario = usuario;
    }

    public LocalDate getDataDistribuicao() {
        return dataDistribuicao;
    }

    public void setDataDistribuicao(LocalDate dataDistribuicao) {
        this.dataDistribuicao = dataDistribuicao;
    }
}
