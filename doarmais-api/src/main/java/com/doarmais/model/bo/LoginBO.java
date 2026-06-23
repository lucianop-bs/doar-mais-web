package com.doarmais.model.bo;

import com.doarmais.model.dao.UsuarioDAO;
import com.doarmais.model.dto.request.LoginRequest;
import com.doarmais.model.dto.response.LoginResponse;
import com.doarmais.model.entity.UsuarioEntity;
import com.doarmais.model.util.AuditLogger;
import com.doarmais.model.util.Logger;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;


@ApplicationScoped
public class LoginBO {

    @Inject
    UsuarioDAO usuarioDAO;
    @Inject
    TokenBO tokenBO;

    @Transactional
    public LoginResponse autenticar(LoginRequest request) {
        AuditLogger.logAction("autenticarService", request.email);
        try {
            UsuarioEntity user = usuarioDAO.buscarPorEmail(request.email).orElseThrow(() -> new RuntimeException("Usuário ou senha incorretos"));

            if (!BCrypt.checkpw(request.senha, user.getSenha())) {
                throw new RuntimeException("Usuário ou senha incorretos");
            }
            String token = tokenBO.gerarToken(user);

            return new LoginResponse(token, user.getNome(), user.getId(), user.isAdmin());

        } catch (Exception e) {
            Logger.logException("autenticarService", request.email, e);
            throw e;
        }
    }
}
