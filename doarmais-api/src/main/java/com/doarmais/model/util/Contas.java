package com.doarmais.model.util;

import com.doarmais.model.dao.UsuarioDAO;
import com.doarmais.model.entity.UsuarioEntity;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;

@ApplicationScoped
public class Contas {
    @Inject
    UsuarioDAO usuarioDAO;

    @Transactional
    void onStart(@Observes StartupEvent ev) {
        if (usuarioDAO.buscarPorEmail("admin@doarmais.com").isEmpty()) {
            UsuarioEntity admin = new UsuarioEntity("Administrador", "admin@doarmais.com",
                    BCrypt.hashpw("admin123", BCrypt.gensalt(10)));
            admin.setAdmin(true);
            usuarioDAO.salvar(admin);
        }
        if (usuarioDAO.buscarPorEmail("doador@doarmais.com").isEmpty()) {
            UsuarioEntity admin = new UsuarioEntity("doador", "doador@doarmais.com",
                    BCrypt.hashpw("123321", BCrypt.gensalt(10)));
            admin.setAdmin(false);
            usuarioDAO.salvar(admin);
        }
    }
}
