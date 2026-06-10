package com.avirat.tech.smt.service;

import com.avirat.tech.smt.dto.StudentInquiryDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface StudentInquiryService {

    public StudentInquiryDto saveStudentInquiry(StudentInquiryDto studentInquiryDto);

    public StudentInquiryDto getStudentInquiry(String  inquiryId);

    public Page<StudentInquiryDto> searchInquiry(
            String inquiryId, String firstName, String lastName,
            String standard, int pageNumber, int pageSize);

    public List<StudentInquiryDto> getAllInquiries();

    public StudentInquiryDto updateInquiry(String inquiryId, StudentInquiryDto dto);

   //public void deleteInquiry(String inquiryId);
}
