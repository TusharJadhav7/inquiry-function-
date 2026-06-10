package com.avirat.tech.smt.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InquiryIdRecordEntity {

    @Id
    private Long inquiryrecordId;
}
