package com.doarmais.model.dto.mapper;

import com.doarmais.model.dto.response.DistribuicaoResponse;
import com.doarmais.model.entity.DistribuicaoEntity;

public class DistribuicaoMapper {
    public static DistribuicaoResponse toResponse(DistribuicaoEntity entity) {
        return new DistribuicaoResponse(
                entity.getId(),
                entity.getBeneficiario(),
                entity.getQuantidadeCestas(),
                entity.getUsuario().getNome(),
                entity.getDataDistribuicao()
        );
    }
}
