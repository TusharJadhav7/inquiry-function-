package com.avirat.tech.smt.repo;

import com.avirat.tech.smt.entity.StudentInquiryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudenInquiryRepo extends JpaRepository<StudentInquiryEntity , String> {
    @Query("""
        SELECT i FROM StudentInquiryEntity i
        WHERE (:inquiryId IS NULL OR i.inquiryId = :inquiryId)
        AND (:firstName IS NULL OR LOWER(i.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')))
        AND (:lastName IS NULL OR LOWER(i.lastName) LIKE LOWER(CONCAT('%', :lastName, '%')))
        AND (:standard IS NULL OR i.standard = :standard)
    """)
    Page<StudentInquiryEntity> searchInquiries (
            @Param("inquiryId") String inquiryId,
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("standard") String standard,
            Pageable pageable
    );

   // public Optional<StudentInquiryEntity> findById(Long findById);
}
