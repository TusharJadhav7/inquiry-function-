package com.avirat.tech.smt.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentRegistrationDataDto {

    @JsonIgnore
    private String regId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String motherName;
    private LocalDate dateOfBirth;
    private String gender;
    private String course;
    private String standard;
    private LocalDate admissionDate;
    private String schoolCollegeName;
    private String address;
    private String stdMobNumber;
    private String parentMobNumber;
    private String email;
    private Long totalFees;
    private Long paidFees;
    private Long remainingFees;
    private String adharCardNumber;
}
