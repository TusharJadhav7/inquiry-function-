package com.avirat.tech.smt.service;

import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface StudentRegistrationService {

    public StudentRegistrationDataDto saveStudentRegistration(StudentRegistrationDataDto studentRegistrationDataDto);

    public StudentRegistrationDataDto getStudentRegistration(String regId);

    public Page<StudentRegistrationDataDto> searchStudentByParam(String param,int pageNumber,int pagesize);
}
