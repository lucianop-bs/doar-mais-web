package com.doarmais.model.bo;

import com.doarmais.model.dao.*;
import com.doarmais.model.dto.mapper.DistribuicaoMapper;
import com.doarmais.model.dto.request.DistribuicaoRequest;
import com.doarmais.model.dto.response.DistribuicaoResponse;
import com.doarmais.model.entity.DistribuicaoEntity;
import com.doarmais.model.entity.ItemEntity;
import com.doarmais.model.entity.TipoItemEntity;
import com.doarmais.model.entity.UsuarioEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.List;

@ApplicationScoped
public class CestaBasicaBO {
    @Inject
    EstoqueDAO estoqueDAO;

    @Inject
    TipoItemDAO tipoItemDAO;

    @Inject
    DistribuicaoDAO distribuicaoDAO;

    @Inject
    UsuarioDAO usuarioDAO;

    @Inject
    JsonWebToken jwt;

    public List<ItemEntity> listarEstoque() {
        return estoqueDAO.listAll().stream()
                .map(e -> new ItemEntity(e.getTipoItem(), e.getQuantidade()))
                .toList();
    }

    public int calcularTotalCestas() {
        var todosTipos = tipoItemDAO.listAll();

        if (todosTipos.isEmpty()) return 0;

        return todosTipos.stream()
                .mapToInt(tipo -> {
                    var estoque = estoqueDAO.findById(tipo.getId());
                    return (estoque != null) ? estoque.getQuantidade() : 0;
                })
                .min()
                .orElse(0);
    }

    @Transactional
    public void distribuirCestas(DistribuicaoRequest request) {
        String email = jwt.getSubject();

        int cestasPossiveis = calcularTotalCestas();
        if (request.quantidadeCestas > cestasPossiveis) {
            throw new RuntimeException("Estoque insuficiente para distribuir " + request.quantidadeCestas + " cestas.");
        }

        UsuarioEntity usuario = usuarioDAO.buscarPorEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        var todosTipos = tipoItemDAO.listAll();
        for (TipoItemEntity tipo : todosTipos) {
            estoqueDAO.atualizarQuantidade(tipo, -request.quantidadeCestas);
        }

        DistribuicaoEntity distribuicao = new DistribuicaoEntity(
                request.beneficiario,
                request.quantidadeCestas,
                usuario
        );
        distribuicaoDAO.salvar(distribuicao);
    }

    public List<DistribuicaoResponse> listarDistribuicoes() {
        return distribuicaoDAO.buscarTodas().stream()
                .map(DistribuicaoMapper::toResponse)
                .toList();
    }
}
