package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.dto.FeesResponseDto;
import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import com.avirat.tech.smt.dto.StudentRegistrationDataResponseDto;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import com.avirat.tech.smt.mapper.StudentRegistrationMapper;
import com.avirat.tech.smt.repo.StudentRegistrationRepo;
import com.avirat.tech.smt.service.FeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class FeesServiceImpl implements FeesService {

    @Autowired
    private StudentRegistrationRepo studentRegistrationRepo;

    @Override
    public Page<StudentRegistrationDataResponseDto> getFees(String regId, String firstName, String middleName, String lastName, String academicYear, Integer pageNumber, Integer pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.Direction.ASC);
        regId = emptyToNull(regId);
        if (regId != null && !regId.toLowerCase().startsWith("reg-")) {
            regId = "Reg-" + regId;
        }
        Page<StudentRegistrationEntity> studentByNameAndAcademicYear = studentRegistrationRepo.searchStudentByNameAndAcademicYear(regId, emptyToNull(firstName),emptyToNull(middleName), emptyToNull(lastName),emptyToNull( academicYear), pageRequest);
        Page<StudentRegistrationDataResponseDto> responseDtoPage = studentByNameAndAcademicYear.map(StudentRegistrationMapper::convertToResponseDto);
        return responseDtoPage;
    }
    private String emptyToNull(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value;
    }
}
