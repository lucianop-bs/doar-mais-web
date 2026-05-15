package com.doarmais.model.bo;

import com.doarmais.model.dao.UsuarioDAO;
import com.doarmais.model.dto.request.CadastroRequest;
import com.doarmais.model.dto.response.CadastraUsuarioResponse;
import com.doarmais.model.entity.UsuarioEntity;
import com.doarmais.model.util.AuditLogger;
import com.doarmais.model.util.Logger;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Optional;

@ApplicationScoped
public class UsuarioBO {
    @Inject
    UsuarioDAO usuarioDAO;

    @Transactional
    public CadastraUsuarioResponse criarUsuario(CadastroRequest request) {
        AuditLogger.logAction("criarUsuarioService", request.email);
        try {

            Optional<UsuarioEntity> user = usuarioDAO.buscarPorEmail(request.email);

            if (user.isPresent()) {
                throw new RuntimeException("Usuário já possui cadastro");
            }
            String senhaHash = BCrypt.hashpw(request.senha, BCrypt.gensalt(10));

            UsuarioEntity novoUsuario = new UsuarioEntity(request.nome, request.email, senhaHash);
            novoUsuario.setBeneficiario(request.isBeneficiario);

            usuarioDAO.salvar(novoUsuario);

            return new CadastraUsuarioResponse(novoUsuario.getId());

        } catch (Exception e) {
            Logger.logException("criarUsuarioService", request.email, e);
            throw e;
        }
    }
}
