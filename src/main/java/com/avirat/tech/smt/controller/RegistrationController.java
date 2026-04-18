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

    @GetMapping("/search")
    public ResponseEntity<Page<StudentRegistrationDataDto>> getStudentRecord(

            @RequestParam(required = false) String regId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String standard,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String adhar,

            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize
    ) {

        Page<StudentRegistrationDataDto> result =
                studentRegistrationService.searchStudent(
                        regId, firstName, lastName,
                        course, standard, email, adhar,
                        pageNumber, pageSize
                );

        return ResponseEntity.ok(result);
    }


    @PatchMapping("/update-student/{regId}")
    public ResponseEntity<StudentRegistrationDataDto> updateStudent(
            @PathVariable String regId,
            @RequestBody StudentRegistrationDataDto dto
    ) {
        StudentRegistrationDataDto updated =
                studentRegistrationService.updateStudent(regId, dto);

        return ResponseEntity.ok(updated);
    }

     @DeleteMapping("/delete-student/{regId}")
     public ResponseEntity<String> deleteStudent(@PathVariable String regId) {

         studentRegistrationService.deleteStudent(regId);

         return ResponseEntity.ok("Student deleted successfully");
     }


}
