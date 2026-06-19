package com.avirat.tech.smt.repo;

import com.avirat.tech.smt.entity.InquiryIdRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InquiryIdRecordRepo extends JpaRepository<InquiryIdRecordEntity,String> {
    @Query("SELECT MAX(r.inquiryrecordId) FROM InquiryIdRecordEntity r")
    Optional<Long> findMaxinquiryId();
}
