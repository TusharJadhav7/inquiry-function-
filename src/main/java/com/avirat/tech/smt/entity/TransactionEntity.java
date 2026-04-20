package com.avirat.tech.smt.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String trnsId;

    private LocalDate trnsDate;

    private Long amountPaid;

    private String VerifyBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "installment_id",nullable = false)
    private InstallmentEntity installment;



}
