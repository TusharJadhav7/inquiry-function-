package com.avirat.tech.smt.dto;

import lombok.*;

import java.time.Duration;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseCatalogDto {

    private String catlogId;

    private String courseName;

    private Duration duration;

    private Long totalFees;

    private Integer installments;

    private String description;

}
