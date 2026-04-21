package com.avirat.tech.smt.mapper;

import com.avirat.tech.smt.dto.InstallmentDTO;
import com.avirat.tech.smt.entity.InstallmentEntity;

public class InstallmentMapper {

    public static InstallmentDTO convertToDto(InstallmentEntity installmentEntity){
        InstallmentDTO installmentDTO  =new InstallmentDTO();
        installmentDTO.setInstallmentId(installmentEntity.getInstallmentId());
        installmentDTO.setInstallNumber(installmentEntity.getInstallNumber());
        installmentDTO.setIntlmtTotalFees(installmentEntity.getIntlmtTotalFees());
        installmentDTO.setIntlmtPaidFees(installmentEntity.getIntlmtPaidFees());
        installmentDTO.setIntlmtPending(installmentEntity.getIntlmtPending());
        return installmentDTO;
    }

    public InstallmentEntity convertToEntity(InstallmentDTO installmentDTO){
        InstallmentEntity installmentEntity  =new InstallmentEntity();
        installmentEntity.setInstallmentId(installmentDTO.getInstallmentId());
        installmentEntity.setInstallNumber(installmentDTO.getInstallNumber());
        installmentEntity.setIntlmtTotalFees(installmentDTO.getIntlmtTotalFees());
        installmentEntity.setIntlmtPaidFees(installmentDTO.getIntlmtPaidFees());
        installmentEntity.setIntlmtPending(installmentDTO.getIntlmtPending());
        return installmentEntity;
    }
}
