package com.doarmais.model.dao;

import com.doarmais.model.entity.UsuarioEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;


@ApplicationScoped
public class UsuarioDAO implements PanacheRepository<UsuarioEntity> {

    public Optional<UsuarioEntity> buscarPorEmail(String email) {
        return find("email = ?1", email).firstResultOptional();
    }

    public void salvar(UsuarioEntity usuario) {
        persist(usuario);
    }
}
