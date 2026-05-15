package com.doarmais.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "estoque")
public class EstoqueEntity {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private TipoItemEntity tipoItem;

    @Column(nullable = false)
    private Integer quantidade;

    public EstoqueEntity() {}

    public EstoqueEntity(TipoItemEntity tipoItem, Integer quantidade) {
        this.tipoItem = tipoItem;
        this.id = tipoItem.getId();
        this.quantidade = quantidade;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoItemEntity getTipoItem() {
        return tipoItem;
    }

    public void setTipoItem(TipoItemEntity tipoItem) {
        this.tipoItem = tipoItem;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
