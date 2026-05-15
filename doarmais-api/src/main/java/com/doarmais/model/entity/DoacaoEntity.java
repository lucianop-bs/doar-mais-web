package com.doarmais.model.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "doacoes")
public class DoacaoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Embedded
    private ItemEntity itemEntityDoacao;
    @ManyToOne
    @JoinColumn(name = "usuario_entity_id")
    private UsuarioEntity usuarioEntity;
    @Column(name = "criado_em", nullable = false)
    private LocalDate criadoEm;

    public DoacaoEntity(ItemEntity itemsDoacao, UsuarioEntity usuarioEntity) {
        this.itemEntityDoacao = itemsDoacao;
        this.usuarioEntity = usuarioEntity;
        this.criadoEm = LocalDate.now();
    }

    public DoacaoEntity() {
    }

    ;

    public ItemEntity getItemDoacao() {
        return itemEntityDoacao;
    }

    public void setItemDoacao(ItemEntity itemEntityDoacao) {
        this.itemEntityDoacao = itemEntityDoacao;
    }

    public UsuarioEntity getUsuario() {
        return usuarioEntity;
    }

    public void setUsuario(UsuarioEntity usuarioEntity) {
        this.usuarioEntity = usuarioEntity;
    }

    public LocalDate getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDate criadoEm) {
        this.criadoEm = criadoEm;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
