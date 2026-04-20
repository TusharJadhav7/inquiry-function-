package com.avirat.tech.smt.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseCatalogDto {

    private String catlogId;

    private String courseName;

    private String duration;

    private Long totalFees;

    private Integer installments;

    private String description;
}
