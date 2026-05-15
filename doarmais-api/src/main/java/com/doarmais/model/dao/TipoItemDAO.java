package com.doarmais.model.dao;

import com.doarmais.model.entity.TipoItemEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class TipoItemDAO implements PanacheRepository<TipoItemEntity> {
    
    public TipoItemEntity buscarPorNome(String nome) {
        return find("nome", nome).firstResult();
    }
}
