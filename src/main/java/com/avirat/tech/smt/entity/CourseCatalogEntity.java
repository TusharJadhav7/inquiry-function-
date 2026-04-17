package com.avirat.tech.smt.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.Duration;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseCatalogEntity {

    @Id
    private String catlogId;

    private String courseName;

    private Duration duration;

    private Long totalFees;

    private Integer installments;

    private String description;




}
