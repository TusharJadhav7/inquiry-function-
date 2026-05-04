package com.avirat.tech.smt.entity;

import jakarta.persistence.*;
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
    private String guardianName;
    private LocalDate dateOfBirth;
    private String gender;
    private String course;
    private String standard;
    private String courseDuration;
    private String academicYear;
    private String academicGroup;
    private LocalDate admissionDate;
    @Column(nullable = false)
    private String schoolCollegeName;
    private String address;
    private String parentAddress;
    private String stdMobNumber;
    private String parentMobNumber;
    private String guardianMobileNumber;
    @Column(unique = true)
    private String email;
    private String parentEmail;
    @Column(nullable = false)
    private Long totalFees;
    private Long paidFees;
    private Long remainingFees;
    @Column(unique = true)
    private String adharCardNumber;

    // Mapping with Fees
    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "fees_id",nullable = false,unique = true)
    private FeesEntity feesEntity;

}
