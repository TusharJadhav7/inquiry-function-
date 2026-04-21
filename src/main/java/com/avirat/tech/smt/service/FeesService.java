package com.avirat.tech.smt.service;

import com.avirat.tech.smt.dto.FeesResponseDto;
import com.avirat.tech.smt.dto.StudentRegistrationDataResponseDto;
import org.springframework.data.domain.Page;

public interface FeesService {

    public Page<StudentRegistrationDataResponseDto> getFees(String regId, String firstName, String middleName, String lastName, String academicYear, Integer pageNumber, Integer pageSize);


}
