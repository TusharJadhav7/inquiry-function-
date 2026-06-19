package com.avirat.tech.smt.mapper;

import com.avirat.tech.smt.dto.FeesDto;
import com.avirat.tech.smt.entity.FeesEntity;

public class FeesMapper {

    public static FeesEntity covertToEntity(FeesDto feesDto){
        FeesEntity feesEntity=new FeesEntity();
        feesEntity.setFeesId(feesDto.getFeesId());
        feesEntity.setFeesStatus(feesDto.getFeesStatus());
        feesEntity.setTotalFees(feesDto.getTotalFees());
        feesEntity.setPaidFees(feesDto.getPaidFees());
        feesEntity.setPending(feesDto.getPending());
        return feesEntity;
    }

    public static FeesDto convertToDto(FeesEntity feesEntity){
        FeesDto feesDto=new FeesDto();
        feesDto.setFeesId(feesEntity.getFeesId());
        feesDto.setFeesStatus(feesEntity.getFeesStatus());
        feesDto.setTotalFees(feesEntity.getTotalFees());
        feesDto.setPaidFees(feesEntity.getPaidFees());
        feesDto.setPending(feesEntity.getPending());
        return feesDto;
    }
}
