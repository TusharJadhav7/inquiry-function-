package com.avirat.tech.smt.mapper;

import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import com.avirat.tech.smt.dto.StudentRegistrationDataResponseDto;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;

public class StudentRegistrationMapper {

    public static StudentRegistrationEntity convertToEntity(StudentRegistrationDataDto dto) {
        StudentRegistrationEntity entity = new StudentRegistrationEntity();
        entity.setFirstName(dto.getFirstName());
        entity.setMiddleName(dto.getMiddleName());
        entity.setLastName(dto.getLastName());
        entity.setMotherName(dto.getMotherName());
        entity.setGuardianName(dto.getGuardianName());
        entity.setDateOfBirth(dto.getDateOfBirth());
        entity.setGender(dto.getGender());
        entity.setCourse(dto.getCourse());
        entity.setStandard(dto.getStandard());
        entity.setCourseDuration(dto.getCourseDuration());
        entity.setAcademicYear(dto.getAcademicYear());
        entity.setAcademicGroup(dto.getAcademicGroup());
        entity.setAdmissionDate(dto.getAdmissionDate());
        entity.setSchoolCollegeName(dto.getSchoolCollegeName());
        entity.setAddress(dto.getAddress());
        entity.setParentAddress(dto.getParentAddress());
        entity.setStdMobNumber(dto.getStdMobNumber());
        entity.setParentMobNumber(dto.getParentMobNumber());
        entity.setGuardianMobileNumber(dto.getGuardianMobileNumber());
        entity.setEmail(dto.getEmail());
        entity.setParentEmail(dto.getParentEmail());
        entity.setTotalFees(dto.getTotalFees());
        entity.setPaidFees(dto.getPaidFees());
        entity.setRemainingFees(dto.getRemainingFees());
        entity.setAdharCardNumber(dto.getAdharCardNumber());
        return entity;
    }

    public static StudentRegistrationDataDto convertToDto(StudentRegistrationEntity entity) {
        StudentRegistrationDataDto dto = new StudentRegistrationDataDto();
        dto.setRegId(entity.getRegId());
        dto.setFirstName(entity.getFirstName());
        dto.setMiddleName(entity.getMiddleName());
        dto.setLastName(entity.getLastName());
        dto.setMotherName(entity.getMotherName());
        dto.setGuardianName(entity.getGuardianName());
        dto.setDateOfBirth(entity.getDateOfBirth());
        dto.setGender(entity.getGender());
        dto.setCourse(entity.getCourse());
        dto.setStandard(entity.getStandard());
        dto.setCourseDuration(entity.getCourseDuration());
        dto.setAcademicYear(entity.getAcademicYear());
        dto.setAcademicGroup(entity.getAcademicGroup());
        dto.setAdmissionDate(entity.getAdmissionDate());
        dto.setSchoolCollegeName(entity.getSchoolCollegeName());
        dto.setAddress(entity.getAddress());
        dto.setParentAddress(entity.getParentAddress());
        dto.setStdMobNumber(entity.getStdMobNumber());
        dto.setParentMobNumber(entity.getParentMobNumber());
        dto.setGuardianMobileNumber(entity.getGuardianMobileNumber());
        dto.setEmail(entity.getEmail());
        dto.setParentEmail(entity.getParentEmail());
        dto.setTotalFees(entity.getTotalFees());
        dto.setPaidFees(entity.getPaidFees());
        dto.setRemainingFees(entity.getRemainingFees());
        dto.setAdharCardNumber(entity.getAdharCardNumber());
        return dto;
    }
    public static StudentRegistrationDataResponseDto convertToResponseDto(StudentRegistrationEntity entity) {
        StudentRegistrationDataResponseDto dto = new StudentRegistrationDataResponseDto();
        dto.setRegId(entity.getRegId());
        dto.setCourse(entity.getCourse());
        dto.setTotalFees(entity.getTotalFees());
        dto.setPaidFees(entity.getPaidFees());
        dto.setStudentName(entity.getFirstName().concat(" ").concat(entity.getMiddleName()).concat(" ").concat(entity.getLastName()));
        dto.setFeesDto(FeesMapper.convertToDto(entity.getFeesEntity()));
        return dto;
    }
}
