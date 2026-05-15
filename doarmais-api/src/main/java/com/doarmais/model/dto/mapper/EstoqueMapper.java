package com.doarmais.model.dto.mapper;

import com.doarmais.model.dto.response.EstoqueResponse;
import com.doarmais.model.entity.ItemEntity;

import java.util.List;
import java.util.stream.Collectors;

public class EstoqueMapper {
    public static EstoqueResponse toResponse(ItemEntity entity) {
        return new EstoqueResponse(entity.getNome().getNome(), entity.getQtd());
    }

    public static List<EstoqueResponse> toResponseList(List<ItemEntity> entityList) {
        return entityList.stream().map(EstoqueMapper::toResponse).collect(Collectors.toList());
    }
}
