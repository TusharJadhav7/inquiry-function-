package com.avirat.tech.smt.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseCatalogDto {

    private String catlogId;

    @NotBlank(message = "Course name is required")
    private String courseName;

    @NotBlank(message = "Duration is required")
    private String duration;

    @NotNull(message = "Total fees is required")
    private Long totalFees;

    private Integer installments;

    private String description;
}
