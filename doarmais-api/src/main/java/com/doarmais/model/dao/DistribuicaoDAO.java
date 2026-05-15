package com.doarmais.model.dao;

import com.doarmais.model.entity.DistribuicaoEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class DistribuicaoDAO implements PanacheRepository<DistribuicaoEntity> {

    public List<DistribuicaoEntity> buscarTodas() {
        return listAll();
    }

    public void salvar(DistribuicaoEntity distribuicao) {
        persist(distribuicao);
    }
}
