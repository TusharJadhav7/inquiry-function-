package com.avirat.tech.smt.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentRegistrationDataResponseDto {

    private String regId;
    private String studentName;
    private String course;
    private Long totalFees;
    private Long paidFees;
    private FeesDto feesDto;

}
