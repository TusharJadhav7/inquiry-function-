package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import com.avirat.tech.smt.dto.StudentRegistrationDataResponseDto;
import com.avirat.tech.smt.service.FeesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fees")
public class FeesController {

    private static final Logger log = LoggerFactory.getLogger(FeesController.class);

    @Autowired
    private FeesService feesService;

    @GetMapping("/search")
    public ResponseEntity<Page<StudentRegistrationDataResponseDto>> searchStudents(
            @RequestParam(required = false) String regId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String middleName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String academicYear,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {
        log.info("ENTER searchStudents() | regId={} firstName={} middleName={} lastName={} academicYear={} pageNumber={} pageSize={}",
                regId, firstName, middleName, lastName, academicYear, pageNumber, pageSize);
        Page<StudentRegistrationDataResponseDto> results = feesService.getFees(regId, firstName,middleName, lastName,academicYear,pageNumber,pageSize);
        log.info("EXIT searchStudents() | totalRecords={}", results.getTotalElements());
        return ResponseEntity.ok(results);
    }

}
