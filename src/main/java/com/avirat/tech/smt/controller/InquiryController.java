package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.StudentInquiryDto;
import com.avirat.tech.smt.service.StudentInquiryService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

import java.util.List;


@RestController
@RequestMapping("/inquiry")
public class InquiryController {

    private static final Logger log = LoggerFactory.getLogger(InquiryController.class);

    @Autowired
    private StudentInquiryService studentInquiryService;

    // ========== INQUIRY CRUD ==========


    @PostMapping

    public ResponseEntity<String> saveInquiry(@RequestBody StudentInquiryDto dto){

        StudentInquiryDto saved = studentInquiryService.saveStudentInquiry(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Registered with " + saved.getInquiryId() + " Successfully");
    }

    @GetMapping
    public ResponseEntity<List<StudentInquiryDto>> getAllInquiry(){
        return ResponseEntity.ok(studentInquiryService.getAllInquiries());

    }

    @GetMapping("/{inquiryId}")
    public ResponseEntity<StudentInquiryDto> getStudentByinquiryId(@PathVariable String inquiryId){
        return ResponseEntity.ok(studentInquiryService.getStudentInquiry(inquiryId));

    }

    @GetMapping("/search")
    public ResponseEntity<Page<StudentInquiryDto>> searchStudentInquiry(
            @RequestParam(required = false) String inquiryId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String standard,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize){

        Page<StudentInquiryDto> result = studentInquiryService.searchInquiry(inquiryId, firstName, lastName, standard, pageNumber, pageSize);

        return ResponseEntity.ok(result);

    }




}
