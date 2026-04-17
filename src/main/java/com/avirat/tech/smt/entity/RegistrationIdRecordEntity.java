package com.avirat.tech.smt.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationIdRecordEntity {

    @Id
    private Long recordId;

}
