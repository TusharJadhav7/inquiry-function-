package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.dto.CourseCatalogDto;
import com.avirat.tech.smt.entity.CatalogIdRecordEntity;
import com.avirat.tech.smt.entity.CourseCatalogEntity;
import com.avirat.tech.smt.mapper.CourseCatalogMapper;
import com.avirat.tech.smt.repo.CatalogIdRecordRepo;
import com.avirat.tech.smt.repo.CourseCatalogRepo;
import com.avirat.tech.smt.service.CourseCatalogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseCatalogServiceImpl implements CourseCatalogService {

    private static final Logger log = LoggerFactory.getLogger(CourseCatalogServiceImpl.class);

    @Autowired
    private CourseCatalogRepo courseCatalogRepo;

    @Autowired
    private CatalogIdRecordRepo catalogIdRecordRepo;

    @Override
    public List<CourseCatalogDto> getCatalog() {
        log.info("Fetching all courses");
        return courseCatalogRepo.findAll().stream()
                .map(CourseCatalogMapper::convertToDto)
                .toList();
    }

    @Override
    public CourseCatalogDto saveNewCatalog(CourseCatalogDto courseCatalogDto) {
        log.info("Saving new course: {}", courseCatalogDto.getCourseName());
        CourseCatalogEntity entity = CourseCatalogMapper.converToEntity(courseCatalogDto);
        String catId = getIncrementedCatId();
        entity.setCatlogId(catId);
        CourseCatalogEntity saved = courseCatalogRepo.save(entity);
        updateCatId(catId);
        log.info("Course saved with ID: {}", catId);
        return CourseCatalogMapper.convertToDto(saved);
    }

    @Override
    public List<String> getAllCourseName() {
        log.info("Fetching all course names");
        return courseCatalogRepo.findAll().stream()
                .map(CourseCatalogEntity::getCourseName)
                .sorted(Comparable::compareTo)
                .toList();
    }

    @Override
    public CourseCatalogDto saveCourseCatalogDto(CourseCatalogDto courseCatalogDto) {
        log.info("Updating course: {}", courseCatalogDto.getCatlogId());
        CourseCatalogEntity entity = CourseCatalogMapper.converToEntity(courseCatalogDto);
        CourseCatalogEntity saved = courseCatalogRepo.save(entity);
        return CourseCatalogMapper.convertToDto(saved);
    }

    @Override
    public Page<CourseCatalogDto> getCourseCatLog(int pageNumber, int pageSize) {
        log.info("Fetching courses page {} (size {})", pageNumber, pageSize);
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.ASC, "catlogId"));
        Page<CourseCatalogEntity> page = courseCatalogRepo.findAll(pageRequest);
        return page.map(CourseCatalogMapper::convertToDto);
    }

    @Override
    public Page<CourseCatalogDto> searchCatalogByParam(String param, int pageNumber, int pagesize) {
        log.info("Searching catalog with param: {}", param);
        PageRequest pageRequest = PageRequest.of(pageNumber, pagesize, Sort.by(Sort.Direction.ASC, "catlogId"));
        Page<CourseCatalogEntity> page = courseCatalogRepo.findByParam(param, pageRequest);
        return page.map(CourseCatalogMapper::convertToDto);
    }

    @Override
    public void deleteCatalog(String catalogId) {
        log.info("Deleting catalog: {}", catalogId);
        CourseCatalogEntity entity = courseCatalogRepo.findById(catalogId)
                .orElseThrow(() -> {
                    log.warn("Delete failed — catalog not found: {}", catalogId);
                    return new RuntimeException("Catalog not found with ID: " + catalogId);
                });
        courseCatalogRepo.delete(entity);
        log.info("Catalog {} deleted successfully", catalogId);
    }

    // ============ HELPERS ============

    private String getIncrementedCatId() {
        Long maxRecordId = catalogIdRecordRepo.findMaxRecordId().orElse(0L);
        maxRecordId = maxRecordId + 1;
        return "Cat-" + maxRecordId.toString();
    }

    private void updateCatId(String catId) {
        String[] parts = catId.split("-");
        CatalogIdRecordEntity entity = CatalogIdRecordEntity.builder()
                .catalogId(Long.valueOf(parts[1]))
                .build();
        catalogIdRecordRepo.save(entity);
    }
}
