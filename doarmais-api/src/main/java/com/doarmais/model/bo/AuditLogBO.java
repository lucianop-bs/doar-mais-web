package com.doarmais.model.bo;

import com.doarmais.model.dao.AuditLogDAO;
import com.doarmais.model.dto.response.AuditLogResponse;
import com.doarmais.model.entity.AuditLogEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class AuditLogBO {

    @Inject
    AuditLogDAO auditLogDAO;

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void registrar(String usuario, String acao, Integer statusHttp, String ip) {
        AuditLogEntity log = new AuditLogEntity(
                usuario == null ? "anonimo" : usuario,
                acao,
                statusHttp,
                ip
        );
        auditLogDAO.salvar(log);
    }

    public List<AuditLogResponse> listar() {
        return auditLogDAO.listarRecentes().stream()
                .map(l -> new AuditLogResponse(
                        l.getId(), l.getUsuario(), l.getAcao(),
                        l.getStatusHttp(), l.getIp(), l.getDataHora()))
                .toList();
    }
}