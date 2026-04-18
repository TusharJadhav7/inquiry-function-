package com.avirat.tech.smt.mapper;

import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;

public class StudentRegistrationMapper {

    public static StudentRegistrationEntity convertToEntity(StudentRegistrationDataDto studentRegistrationDataDto){

        StudentRegistrationEntity studentRegistrationEntity =new StudentRegistrationEntity();
        studentRegistrationEntity.setFirstName(studentRegistrationDataDto.getFirstName());
        studentRegistrationEntity.setMiddleName(studentRegistrationDataDto.getMiddleName());
        studentRegistrationEntity.setLastName(studentRegistrationDataDto.getLastName());
        studentRegistrationEntity.setMotherName(studentRegistrationDataDto.getMotherName());
        studentRegistrationEntity.setDateOfBirth(studentRegistrationDataDto.getDateOfBirth());
        studentRegistrationEntity.setGender(studentRegistrationDataDto.getGender());
        studentRegistrationEntity.setCourse(studentRegistrationDataDto.getCourse());
        studentRegistrationEntity.setStandard(studentRegistrationDataDto.getStandard());
        studentRegistrationEntity.setAdmissionDate(studentRegistrationDataDto.getAdmissionDate());
        studentRegistrationEntity.setAddress(studentRegistrationDataDto.getAddress());
        studentRegistrationEntity.setSchoolCollegeName(studentRegistrationDataDto.getSchoolCollegeName());
        studentRegistrationEntity.setStdMobNumber(studentRegistrationDataDto.getStdMobNumber());
        studentRegistrationEntity.setParentMobNumber(studentRegistrationDataDto.getParentMobNumber());
        studentRegistrationEntity.setEmail(studentRegistrationDataDto.getEmail());
        studentRegistrationEntity.setTotalFees(studentRegistrationDataDto.getTotalFees());
        studentRegistrationEntity.setPaidFees(studentRegistrationDataDto.getPaidFees());
        studentRegistrationEntity.setRemainingFees(studentRegistrationDataDto.getRemainingFees());
        studentRegistrationEntity.setAdharCardNumber(studentRegistrationDataDto.getAdharCardNumber());
        return studentRegistrationEntity;

    }
    public static StudentRegistrationDataDto convertToDto(StudentRegistrationEntity studentRegistrationEntity){

        StudentRegistrationDataDto studentRegistrationDataDto =new StudentRegistrationDataDto();
        studentRegistrationDataDto.setRegId(studentRegistrationEntity.getRegId());
        studentRegistrationDataDto.setFirstName(studentRegistrationEntity.getFirstName());
        studentRegistrationDataDto.setMiddleName(studentRegistrationEntity.getMiddleName());
        studentRegistrationDataDto.setLastName(studentRegistrationEntity.getLastName());
        studentRegistrationDataDto.setMotherName(studentRegistrationEntity.getMotherName());
        studentRegistrationDataDto.setDateOfBirth(studentRegistrationEntity.getDateOfBirth());
        studentRegistrationDataDto.setGender(studentRegistrationEntity.getGender());
        studentRegistrationDataDto.setCourse(studentRegistrationEntity.getCourse());
        studentRegistrationDataDto.setStandard(studentRegistrationEntity.getStandard());
        studentRegistrationDataDto.setAdmissionDate(studentRegistrationEntity.getAdmissionDate());
        studentRegistrationDataDto.setAddress(studentRegistrationEntity.getAddress());
        studentRegistrationDataDto.setSchoolCollegeName(studentRegistrationEntity.getSchoolCollegeName());
        studentRegistrationDataDto.setParentMobNumber(studentRegistrationEntity.getParentMobNumber());
        studentRegistrationDataDto.setStdMobNumber(studentRegistrationEntity.getStdMobNumber());
        studentRegistrationDataDto.setEmail(studentRegistrationEntity.getEmail());
        studentRegistrationDataDto.setTotalFees(studentRegistrationEntity.getTotalFees());
        studentRegistrationDataDto.setPaidFees(studentRegistrationEntity.getPaidFees());
        studentRegistrationDataDto.setRemainingFees(studentRegistrationEntity.getRemainingFees());
        studentRegistrationDataDto.setAdharCardNumber(studentRegistrationEntity.getAdharCardNumber());
        return studentRegistrationDataDto;
    }


}
