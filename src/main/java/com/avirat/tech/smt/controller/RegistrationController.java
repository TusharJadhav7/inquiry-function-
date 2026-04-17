package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import com.avirat.tech.smt.service.StudentRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registration")
public class RegistrationController {

    @Autowired
    private StudentRegistrationService studentRegistrationService;

    @PostMapping
    public ResponseEntity<String> registerStudent(@RequestBody StudentRegistrationDataDto studentRegistrationDataDto){
        StudentRegistrationDataDto savedStudentRegistration= studentRegistrationService.saveStudentRegistration(studentRegistrationDataDto);
        return ResponseEntity.accepted().body("Registered with"+savedStudentRegistration.getRegId()+"Successfull");
    }

    @GetMapping("/search/{param}")
    public ResponseEntity<Page<StudentRegistrationDataDto>> getStudentRecord(@PathVariable(name = "param",required = true) String searchParamerter,@RequestParam(name = "pageNumber",required = false,defaultValue ="0" ) int pageNumber,@RequestParam(name = "pageSize",required = false,defaultValue = "1") int pageSize  ){
        Page<StudentRegistrationDataDto> studentRegistrationDataDtos = studentRegistrationService.searchStudentByParam(searchParamerter, pageNumber, pageSize);
        return ResponseEntity.ok(studentRegistrationDataDtos);
    }




}
