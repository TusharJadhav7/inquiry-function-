package com.avirat.tech.smt.dto;


import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InstallmentResponseDTO {

    private String regId;
    private String stdFullName;
    private String CourseName;
    private String standard;
    private String academicYear;
    private List<InstallmentDTO> installmentDTOS;
    private Long totalFees;
    private Long paidFees;
    private Long paindingFees;


}
