package com.avirat.tech.smt.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

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

    private String duration;

    private Long totalFees;

    private Integer installments;

    private String description;
}
