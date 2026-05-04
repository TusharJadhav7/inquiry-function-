package com.avirat.tech.smt.repo;

import com.avirat.tech.smt.entity.FeesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeesRepo extends JpaRepository<FeesEntity,Integer> {



}
