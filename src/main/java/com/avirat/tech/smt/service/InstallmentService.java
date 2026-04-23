package com.avirat.tech.smt.service;

import com.avirat.tech.smt.dto.InstallmentResponseDTO;
import com.avirat.tech.smt.entity.CourseCatalogEntity;
import com.avirat.tech.smt.entity.FeesEntity;

public interface InstallmentService {

    public void installmentGenerator(FeesEntity feesEntity, CourseCatalogEntity courseCatalogEntity);

    public InstallmentResponseDTO getInstallment(Integer feesId);
}
