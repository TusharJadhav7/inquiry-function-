package com.avirat.tech.smt.repo;

import com.avirat.tech.smt.entity.InstallmentEntity;
import com.avirat.tech.smt.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TransactionRepo extends JpaRepository<TransactionEntity,String> {

    public Optional<TransactionEntity> findByInstallment(InstallmentEntity installment);
}
