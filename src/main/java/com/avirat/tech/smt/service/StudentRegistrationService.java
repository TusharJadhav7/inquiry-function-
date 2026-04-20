package com.avirat.tech.smt.service;

import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface StudentRegistrationService {

    public StudentRegistrationDataDto saveStudentRegistration(StudentRegistrationDataDto studentRegistrationDataDto);

    public StudentRegistrationDataDto getStudentRegistration(String regId);

    public Page<StudentRegistrationDataDto> searchStudent(
            String regId, String firstName, String lastName,
            String course, String standard, String email,
            String adhar, int pageNumber, int pageSize);

    public List<StudentRegistrationDataDto> getAllStudents();

    public StudentRegistrationDataDto updateStudent(String regId, StudentRegistrationDataDto dto);

    public void deleteStudent(String regId);

    public StudentRegistrationDataDto updateStudentFees(String regId, Long paidAmount);

    public void resetStudentFees(String regId);
}
