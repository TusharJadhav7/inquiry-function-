package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.dto.FeesResponseDto;
import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import com.avirat.tech.smt.dto.StudentRegistrationDataResponseDto;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import com.avirat.tech.smt.mapper.StudentRegistrationMapper;
import com.avirat.tech.smt.repo.StudentRegistrationRepo;
import com.avirat.tech.smt.service.FeesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class FeesServiceImpl implements FeesService {

    private static final Logger log = LoggerFactory.getLogger(FeesServiceImpl.class);

    @Autowired
    private StudentRegistrationRepo studentRegistrationRepo;

    @Override
    public Page<StudentRegistrationDataResponseDto> getFees(String regId, String firstName, String middleName, String lastName, String academicYear, Integer pageNumber, Integer pageSize) {
        log.info("ENTER getFees() | regId={} firstName={} middleName={} lastName={} academicYear={} pageNumber={} pageSize={}",
                regId, firstName, middleName, lastName, academicYear, pageNumber, pageSize);
        if (pageNumber < 0 || pageSize <= 0) {
            throw new IllegalArgumentException("Invalid pagination values");
        }
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.ASC,"firstName"));
        regId = emptyToNull(regId);
        if (regId != null && !regId.toLowerCase().startsWith("reg-")) {
            regId = "Reg-" + regId;
        }
        log.info("Normalized regId={}", regId);
        log.info("Calling repository searchStudentByNameAndAcademicYear()");
        Page<StudentRegistrationEntity> studentByNameAndAcademicYear = studentRegistrationRepo.searchStudentByNameAndAcademicYear(regId, emptyToNull(firstName),emptyToNull(middleName), emptyToNull(lastName),emptyToNull( academicYear), pageRequest);
        log.info("Repository returned {} records", studentByNameAndAcademicYear.getTotalElements());
        Page<StudentRegistrationDataResponseDto> responseDtoPage = studentByNameAndAcademicYear.map(StudentRegistrationMapper::convertToResponseDto);
        log.info("EXIT getFees() | totalRecords={}", responseDtoPage.getTotalElements());
        return responseDtoPage;
    }
    private String emptyToNull(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value;
    }
}
