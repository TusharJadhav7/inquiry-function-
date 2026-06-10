package com.avirat.tech.smt.mapper;

import com.avirat.tech.smt.dto.StudentInquiryDto;
import com.avirat.tech.smt.dto.StudentInquiryResponseDto;
import com.avirat.tech.smt.entity.StudentInquiryEntity;

public class StudentInquiryMapper {

    public static StudentInquiryEntity convertToEntity(StudentInquiryDto dto) {
        StudentInquiryEntity entity = new StudentInquiryEntity();
        entity.setFirstName(dto.getFirstName());
        entity.setMiddleName(dto.getMiddleName());
        entity.setLastName(dto.getLastName());
        entity.setCourse(dto.getCourse());
        entity.setStandard(dto.getStandard());
        entity.setParentMobNumber(dto.getParentMobNumber());
        entity.setTotalFees(dto.getTotalFees());
        return entity;
    }

    public static StudentInquiryDto convertToDto(StudentInquiryEntity entity) {
        StudentInquiryDto dto = new StudentInquiryDto();
        dto.setInquiryId(entity.getInquiryId());
        dto.setFirstName(entity.getFirstName());
        dto.setMiddleName(entity.getMiddleName());
        dto.setLastName(entity.getLastName());
        dto.setCourse(entity.getCourse());
        dto.setStandard(entity.getStandard());
        dto.setParentMobNumber(entity.getParentMobNumber());
        dto.setTotalFees(entity.getTotalFees());
        dto.setInquiryDate(entity.getInquiryDate());
        return dto;
    }

    public static StudentInquiryResponseDto convertToResponseDto(StudentInquiryEntity entity) {
        StudentInquiryResponseDto dto = new StudentInquiryResponseDto();
        dto.setInquiryId(entity.getInquiryId());
        dto.setStudentName(entity.getFirstName() + " " + entity.getLastName());
        dto.setCourse(entity.getCourse());
        dto.setStandard(entity.getStandard());
        dto.setParentMobNumber(entity.getParentMobNumber());
        dto.setTotalFees(entity.getTotalFees());
        dto.setInquiryDate(entity.getInquiryDate());
        return dto;
    }
}
