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
@Table(name = "STUDENT_FEES")
public class FeesEntity {

    @Id
    @GeneratedValue(strategy =  GenerationType.SEQUENCE)
    private Integer feesId;

    private Long totalFees;

    private Long paidFees;

    private Long pending;

    private String feesStatus;

    @OneToMany(mappedBy = "fees",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<InstallmentEntity> installmentEntityList;




}
