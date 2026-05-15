package com.doarmais.model.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "usuarios")

public class UsuarioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String senha;
    @Column(name = "criado_em", nullable = false)
    private LocalDate criadoEm;
    @Column(name = "is_admin", nullable = false)
    private boolean isAdmin;
    @Column(name = "is_beneficiario", nullable = false)
    private boolean isBeneficiario;

    public UsuarioEntity() {
    }

    public UsuarioEntity(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.criadoEm = LocalDate.now();
        this.isAdmin = false;
        this.isBeneficiario = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public LocalDate getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDate criadoEm) {
        this.criadoEm = criadoEm;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isBeneficiario() {
        return isBeneficiario;
    }

    public void setBeneficiario(boolean beneficiario) {
        isBeneficiario = beneficiario;
    }
}
