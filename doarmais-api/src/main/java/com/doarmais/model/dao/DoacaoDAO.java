package com.doarmais.model.dao;

import com.doarmais.model.entity.DoacaoEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class DoacaoDAO implements PanacheRepository<DoacaoEntity> {


    public void salvar(DoacaoEntity doacao) {
        persist(doacao);
    }

    public List<DoacaoEntity> buscarTodos() {
        return listAll();
    }


}
