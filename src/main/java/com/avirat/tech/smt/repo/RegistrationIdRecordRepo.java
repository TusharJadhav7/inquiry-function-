package com.avirat.tech.smt.repo;

import com.avirat.tech.smt.entity.RegistrationIdRecordEntity;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationIdRecordRepo  extends JpaRepository<RegistrationIdRecordEntity,Long> {

    @Query("SELECT MAX(r.recordId) FROM RegistrationIdRecordEntity r")
    public Optional<Long> findMaxRecordId();


}
