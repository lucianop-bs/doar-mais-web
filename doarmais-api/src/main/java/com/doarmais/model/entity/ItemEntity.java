package com.doarmais.model.entity;


import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class ItemEntity {

    @ManyToOne
    @JoinColumn(name = "tipo_item_id")
    private TipoItemEntity nome;
    private Integer qtd;

    public ItemEntity(TipoItemEntity nome, Integer qtd) {
        this.nome = nome;
        this.qtd = qtd;
    }

    public ItemEntity() {

    }

    public Integer getQtd() {
        return qtd;
    }

    public void setQtd(Integer qtd) {
        this.qtd = qtd;
    }

    public TipoItemEntity getNome() {
        return nome;
    }

    public void setNome(TipoItemEntity nome) {
        this.nome = nome;
    }
}
