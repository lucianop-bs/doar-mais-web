package com.doarmais.model.bo;

import com.doarmais.model.dao.UsuarioDAO;
import com.doarmais.model.dto.request.CadastroRequest;
import com.doarmais.model.dto.request.UsuarioUpdateRequest;
import com.doarmais.model.dto.response.CadastraUsuarioResponse;
import com.doarmais.model.dto.response.UsuarioResponse;
import com.doarmais.model.entity.UsuarioEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.ForbiddenException;
import jakarta.ws.rs.NotFoundException;
import org.mindrot.jbcrypt.BCrypt;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class UsuarioBO {
    @Inject
    UsuarioDAO usuarioDAO;

    @Transactional
    public CadastraUsuarioResponse criarUsuario(CadastroRequest request) {
        Optional<UsuarioEntity> user = usuarioDAO.buscarPorEmail(request.email);

        if (user.isPresent()) {
            throw new RuntimeException("Usuário já possui cadastro");
        }
        String senhaHash = BCrypt.hashpw(request.senha, BCrypt.gensalt(10));

        UsuarioEntity novoUsuario = new UsuarioEntity(request.nome, request.email, senhaHash);
        novoUsuario.setBeneficiario(request.isBeneficiario);

        usuarioDAO.salvar(novoUsuario);

        return new CadastraUsuarioResponse(novoUsuario.getId());
    }

    public List<UsuarioResponse> listarTodos() {
        return usuarioDAO.listarTodos().stream()
                .map(this::toResponse)
                .toList();
    }

    public UsuarioResponse buscarPorEmail(String email) {
        UsuarioEntity user = usuarioDAO.buscarPorEmail(email)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));
        return toResponse(user);
    }

    @Transactional
    public UsuarioResponse atualizar(Long id, UsuarioUpdateRequest request, String emailLogado, boolean admin) {
        UsuarioEntity user = usuarioDAO.buscarPorId(id);
        if (user == null) {
            throw new NotFoundException("Usuário não encontrado");
        }

        if (!admin && !user.getEmail().equals(emailLogado)) {
            throw new ForbiddenException("Sem permissão para alterar este usuário");
        }

        if (request.nome != null && !request.nome.isBlank()) {
            user.setNome(request.nome);
        }
        if (request.email != null && !request.email.isBlank()) {
            user.setEmail(request.email);
        }
        if (admin && request.isAdmin != null) {
            user.setAdmin(request.isAdmin);
        }

        return toResponse(user);
    }

    @Transactional
    public void excluir(Long id, String emailLogado, boolean admin) {
        UsuarioEntity user = usuarioDAO.buscarPorId(id);
        if (user == null) {
            throw new NotFoundException("Usuário não encontrado");
        }

        if (!admin && !user.getEmail().equals(emailLogado)) {
            throw new ForbiddenException("Sem permissão para excluir este usuário");
        }

        usuarioDAO.deletarPorId(id);
    }

    private UsuarioResponse toResponse(UsuarioEntity u) {
        return new UsuarioResponse(u.getId(), u.getNome(), u.getEmail(), u.isAdmin(), u.isBeneficiario());
    }
}
