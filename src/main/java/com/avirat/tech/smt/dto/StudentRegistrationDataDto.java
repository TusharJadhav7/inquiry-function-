package com.avirat.tech.smt.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentRegistrationDataDto {

    private String regId;

    @NotBlank(message = "First name is required")
    private String firstName;

    private String middleName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    private String motherName;
    private String guardianName;

    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Course is required")
    private String course;

    private String standard;
    private String courseDuration;
    private String academicYear;
    private String academicGroup;
    private LocalDate admissionDate;

    @NotBlank(message = "School/College name is required")
    private String schoolCollegeName;

    private String address;
    private String parentAddress;

    @Pattern(regexp = "^$|^[0-9]{10}$", message = "Mobile number must be exactly 10 digits")
    private String stdMobNumber;

    @Pattern(regexp = "^$|^[0-9]{10}$", message = "Parent mobile number must be exactly 10 digits")
    private String parentMobNumber;

    @Pattern(regexp = "^$|^[0-9]{10}$", message = "Guardian mobile number must be exactly 10 digits")
    private String guardianMobileNumber;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Invalid parent email format")
    private String parentEmail;

    @NotNull(message = "Total fees is required")
    private Long totalFees;

    private Long paidFees;
    private Long remainingFees;

    @Pattern(regexp = "^$|^[0-9]{12}$", message = "Aadhaar number must be exactly 12 digits")
    private String adharCardNumber;


}
