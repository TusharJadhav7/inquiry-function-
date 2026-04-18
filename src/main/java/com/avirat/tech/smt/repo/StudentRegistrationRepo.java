package com.avirat.tech.smt.repo;

import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRegistrationRepo extends JpaRepository<StudentRegistrationEntity,String> {

    @Query("""
SELECT s FROM StudentRegistrationEntity s
WHERE (:regId IS NULL OR s.regId = :regId)
AND (:firstName IS NULL OR LOWER(s.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')))
AND (:lastName IS NULL OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :lastName, '%')))
AND (:course IS NULL OR s.course = :course)
AND (:standard IS NULL OR s.standard = :standard)
AND (:email IS NULL OR LOWER(s.email) LIKE LOWER(CONCAT('%', :email, '%')))
AND (:adhar IS NULL OR s.adharCardNumber = :adhar)
""")
    Page<StudentRegistrationEntity> searchStudents(
            @Param("regId") String regId,
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("course") String course,
            @Param("standard") String standard,
            @Param("email") String email,
            @Param("adhar") String adhar,
            Pageable pageable
    );
}
