package com.doarmais.model.bo;

import com.doarmais.model.dao.TipoItemDAO;
import com.doarmais.model.dto.mapper.TipoItemMapper;
import com.doarmais.model.dto.response.TipoItemResponse;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class TipoItemBO {

    @Inject
    TipoItemDAO tipoItemDAO;

    public List<TipoItemResponse> listar() {
        return tipoItemDAO.listAll().stream()
                .map(TipoItemMapper::toResponse)
                .toList();
    }
}