package com.avirat.tech.smt.repo;

import com.avirat.tech.smt.entity.CatalogIdRecordEntity;
import com.avirat.tech.smt.entity.CourseCatalogEntity;
import com.avirat.tech.smt.entity.RegistrationIdRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CatalogIdRecordRepo extends JpaRepository<CatalogIdRecordEntity,Long> {

    @Query("SELECT MAX(c.catalogId) FROM CatalogIdRecordEntity c")
    public Optional<Long> findMaxRecordId();

}
