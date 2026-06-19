package com.avirat.tech.smt.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentInquiryResponseDto {

    private String inquiryId;
    private String studentName;
    private String course;
    private String standard;
    private String parentMobNumber;
    private Long totalFees;
    private LocalDate inquiryDate;

}
