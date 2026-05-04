package com.avirat.tech.smt.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class  InstallmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer installmentId;

    private Long installNumber;

    private Long intlmtTotalFees;

    private Long intlmtPaidFees;

    private Long intlmtPending;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Fees_id",nullable = false)
    private FeesEntity fees;

    @OneToMany(mappedBy = "installment",fetch = FetchType.EAGER,orphanRemoval = true)
    List<TransactionEntity> transactionEntityList;


}
