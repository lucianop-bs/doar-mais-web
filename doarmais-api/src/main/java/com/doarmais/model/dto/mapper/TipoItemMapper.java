package com.doarmais.model.dto.mapper;

import com.doarmais.model.dto.response.TipoItemResponse;
import com.doarmais.model.entity.TipoItemEntity;

public class TipoItemMapper {
    public static TipoItemResponse toResponse(TipoItemEntity entity) {
        return new TipoItemResponse(
                entity.getId(),
                entity.getNome(),
                entity.getDescricao()
        );
    }
}