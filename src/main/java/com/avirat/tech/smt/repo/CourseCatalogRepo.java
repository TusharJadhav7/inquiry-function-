package com.avirat.tech.smt.repo;

import com.avirat.tech.smt.entity.CourseCatalogEntity;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseCatalogRepo extends JpaRepository<CourseCatalogEntity,String> {


    @Query("SELECT c FROM CourseCatalogEntity c where c.catlogId=:field or c.courseName=:field")
    Page<CourseCatalogEntity> findByParam(@Param("field") String param, Pageable pageable);

    Optional<CourseCatalogEntity> findByCourseName(String courseName);
}
