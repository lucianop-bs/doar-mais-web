package com.doarmais.model.bo;

import com.doarmais.model.dao.DoacaoDAO;
import com.doarmais.model.dao.EstoqueDAO;
import com.doarmais.model.dao.TipoItemDAO;
import com.doarmais.model.dao.UsuarioDAO;
import com.doarmais.model.dto.mapper.DoacaoMapper;
import com.doarmais.model.dto.request.DoacaoRequest;
import com.doarmais.model.dto.response.DoacaoResponse;
import com.doarmais.model.entity.DoacaoEntity;
import com.doarmais.model.entity.ItemEntity;
import com.doarmais.model.entity.UsuarioEntity;
import com.doarmais.model.util.AuditLogger;
import com.doarmais.model.util.Logger;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.List;

@ApplicationScoped
public class DoacaoBO {
    @Inject
    DoacaoDAO doacaoDAO;
    @Inject
    UsuarioDAO usuarioDAO;
    @Inject
    TipoItemDAO tipoItemDAO;
    @Inject
    EstoqueDAO estoqueDAO;
    @Inject
    JsonWebToken jwt;

    @Transactional
    public void criarDoacao(List<DoacaoRequest> request) {

        String email = jwt.getSubject();

        AuditLogger.logAction("doarService", email);
        try {
            UsuarioEntity usuario = usuarioDAO
                    .buscarPorEmail(email)
                    .orElseThrow(() ->
                            new RuntimeException("Usuário não encontrado"));

            for (DoacaoRequest doacaoRequest : request) {
                var tipoItem = tipoItemDAO.buscarPorNome(doacaoRequest.item);
                if (tipoItem == null) {
                    throw new RuntimeException("Tipo de item não encontrado: " + doacaoRequest.item);
                }
                
                ItemEntity item = new ItemEntity(tipoItem, doacaoRequest.quantidade);

                DoacaoEntity doacao = new DoacaoEntity(item, usuario);

                doacaoDAO.salvar(doacao);
                estoqueDAO.atualizarQuantidade(tipoItem, doacaoRequest.quantidade);
            }

        } catch (Exception e) {
            Logger.logException("doarService", email, e);
            throw e;
        }
    }

    public List<DoacaoResponse> listarDoacoes() {
        AuditLogger.logAction("listarDoacoesService", "sistema");
        try {
            List<DoacaoResponse> lista = doacaoDAO.buscarTodos()
                    .stream()
                    .map(DoacaoMapper::toResponse)
                    .toList();
            return lista;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void removerDoacao(Long id) {
        DoacaoEntity doacao = doacaoDAO.buscarPorId(id);
        if (doacao == null) {
            throw new RuntimeException("Doação não encontrada");
        }

        ItemEntity item = doacao.getItemDoacao();
        if (item != null && item.getNome() != null) {
            var estoque = estoqueDAO.findById(item.getNome().getId());
            int qtdAtual = estoque == null ? 0 : estoque.getQuantidade();

            if (qtdAtual < item.getQtd()) {
                int distribuidas = item.getQtd() - qtdAtual;
                throw new RuntimeException(
                        "Não é possível remover esta doação: " + distribuidas +
                                " unidade(s) de " + item.getNome().getDescricao() +
                                " já foram distribuídas."
                );
            }

            estoqueDAO.atualizarQuantidade(item.getNome(), -item.getQtd());
        }

        doacaoDAO.deletarPorId(id);
        AuditLogger.logAction("removerDoacao", jwt.getSubject());
    }
}
