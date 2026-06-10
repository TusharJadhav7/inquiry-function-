package com.avirat.tech.smt.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentInquiryDto {
    private String inquiryId;

    @NotBlank(message = "First name is required")
    private String firstName;

    private String middleName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Course is required")
    private String course;

    private String standard;

    @Pattern(regexp = "^$|^[0-9]{10}$", message = "Parent mobile number must be exactly 10 digits")
    private String parentMobNumber;

    @NotNull(message = "Total fees is required")
    private Long totalFees;

    private LocalDate inquiryDate;
}
