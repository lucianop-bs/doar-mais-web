package com.doarmais.model.dto.mapper;

import com.doarmais.model.dto.response.DoacaoResponse;
import com.doarmais.model.entity.DoacaoEntity;


public class DoacaoMapper {
    public static DoacaoResponse toResponse(DoacaoEntity entity) {
        return new DoacaoResponse(
                entity.getId(),
                entity.getItemDoacao().getNome().getDescricao(),
                entity.getItemDoacao().getQtd(),
                entity.getUsuario().getNome(),
                entity.getCriadoEm()
        );
    }
}
