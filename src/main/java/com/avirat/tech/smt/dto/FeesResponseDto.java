package com.avirat.tech.smt.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeesResponseDto {

    private Integer feesId;

    private Long totalFees;

    private Long paidFees;

    private Long pending;

    private String feesStatus;

    private StudentRegistrationDataDto studentRegistrationDataDto;
}
