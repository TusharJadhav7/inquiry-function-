package com.avirat.tech.smt.mapper;

import com.avirat.tech.smt.dto.CourseCatalogDto;
import com.avirat.tech.smt.entity.CourseCatalogEntity;

public class CourseCatalogMapper {

    public static CourseCatalogEntity converToEntity(CourseCatalogDto courseCatalogDto){
        CourseCatalogEntity courseCatalogEntity =new CourseCatalogEntity();
        courseCatalogEntity.setCatlogId(courseCatalogDto.getCatlogId());
        courseCatalogEntity.setCourseName(courseCatalogDto.getCourseName());
        courseCatalogEntity.setDuration(courseCatalogDto.getDuration());
        courseCatalogEntity.setTotalFees(courseCatalogDto.getTotalFees());
        courseCatalogEntity.setInstallments(courseCatalogDto.getInstallments());
        courseCatalogEntity.setDescription(courseCatalogDto.getDescription());
        return courseCatalogEntity;
    }

    public static CourseCatalogDto convertToDto(CourseCatalogEntity courseCatalogEntity){
        CourseCatalogDto courseCatalogDto=new CourseCatalogDto();
        courseCatalogDto.setCatlogId(courseCatalogEntity.getCatlogId());
        courseCatalogDto.setCourseName(courseCatalogEntity.getCourseName());
        courseCatalogDto.setDuration(courseCatalogEntity.getDuration());
        courseCatalogDto.setTotalFees(courseCatalogEntity.getTotalFees());
        courseCatalogDto.setInstallments(courseCatalogEntity.getInstallments());
        courseCatalogDto.setDescription(courseCatalogEntity.getDescription());
        return courseCatalogDto;
    }
}
