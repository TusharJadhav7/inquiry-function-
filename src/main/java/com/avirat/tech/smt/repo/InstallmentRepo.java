package com.avirat.tech.smt.repo;

import com.avirat.tech.smt.entity.FeesEntity;
import com.avirat.tech.smt.entity.InstallmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface InstallmentRepo extends JpaRepository<InstallmentEntity,Integer> {

    Optional<InstallmentEntity> findByFees(FeesEntity fees);
}
