package com.avirat.tech.smt.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.UniqueConstraint;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentRegistrationEntity {

    @Id
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
    @Column(unique = true)
    private String email;
    @Column(nullable = false)
    private Long totalFees;
    private Long paidFees;
    private Long remainingFees;
    @Column(unique = true)
    private String adharCardNumber;


}
