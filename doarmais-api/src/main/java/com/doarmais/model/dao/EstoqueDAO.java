package com.doarmais.model.dao;

import com.doarmais.model.entity.EstoqueEntity;
import com.doarmais.model.entity.TipoItemEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class EstoqueDAO implements PanacheRepository<EstoqueEntity> {

    public void atualizarQuantidade(TipoItemEntity tipoItem, int delta) {
        EstoqueEntity estoque = findById(tipoItem.getId());
        if (estoque == null) {
            estoque = new EstoqueEntity(tipoItem, Math.max(0, delta));
            persist(estoque);
        } else {
            estoque.setQuantidade(estoque.getQuantidade() + delta);
        }
    }
}
