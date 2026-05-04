package com.avirat.tech.smt.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionResponseDto {

    private String regId;
    private String stdName;
    private String course;
    private Long installmentNumber;
    private Long installmentTotalFees;
    private List<TransactionDto> transactionDto;

}
