package com.avirat.tech.smt.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor@Builder
public class StudentInquiryEntity {
    @Id
    private String  inquiryId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String course;
    private String standard;
    private String parentMobNumber;
    private Long totalFees;
    @Column(nullable = false)
    private LocalDate inquiryDate;

}
