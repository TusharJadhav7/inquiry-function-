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

    @Query("SELECT s FROM StudentRegistrationEntity s where s.regId=:field or s.firstName=:field or s.lastName=:field or s.course=:field or s.email=:field or s.adharCardNumber=:filed")
    Page<StudentRegistrationEntity> findByParam(@Param("field") String param, Pageable pageable);
}
