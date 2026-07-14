package com.doarmais.model.dao;

import com.doarmais.model.entity.AuditLogEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class AuditLogDAO implements PanacheRepository<AuditLogEntity> {

    public void salvar(AuditLogEntity log) {
        persist(log);
    }

    public List<AuditLogEntity> listarRecentes() {
        return find("ORDER BY dataHora DESC").page(0, 200).list();
    }
}