package com.avirat.tech.smt.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionDto {

    private LocalDate trnsDate;

    private Long amountPaid;

    private String VerifyBy;
}
