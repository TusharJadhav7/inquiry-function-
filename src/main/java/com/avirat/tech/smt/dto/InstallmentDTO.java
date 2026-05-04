package com.avirat.tech.smt.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InstallmentDTO {

    private Integer installmentId;

    private Long installNumber;

    private Long intlmtTotalFees;

    private Long intlmtPaidFees;

    private Long intlmtPending;
}
