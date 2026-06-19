package com.avirat.tech.smt.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeesDto {


    private Integer feesId;

    private Long totalFees;

    private Long paidFees;

    private Long pending;

    private String feesStatus;

}
