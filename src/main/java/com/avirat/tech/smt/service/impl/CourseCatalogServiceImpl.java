package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.dto.CourseCatalogDto;
import com.avirat.tech.smt.entity.CatalogIdRecordEntity;
import com.avirat.tech.smt.entity.CourseCatalogEntity;
import com.avirat.tech.smt.exception.globalexception.DataNotFoundException;
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
        log.info("Fetching all courses. Inside getCatalog()");
        return courseCatalogRepo.findAll().stream()
                .map(CourseCatalogMapper::convertToDto)
                .toList();
    }

    @Override
    public CourseCatalogDto saveNewCatalog(CourseCatalogDto courseCatalogDto) {
        log.info("ENTER saveNewCatalog() | courseName={}", courseCatalogDto.getCourseName());
        CourseCatalogEntity entity = CourseCatalogMapper.converToEntity(courseCatalogDto);
        String catId = getIncrementedCatId();
        entity.setCatlogId(catId);
        CourseCatalogEntity saved = courseCatalogRepo.save(entity);
        updateCatId(catId);
        log.info("EXIT saveNewCatalog() | catId={}", catId);
        return CourseCatalogMapper.convertToDto(saved);
    }

    @Override
    public List<String> getAllCourseName() {
        log.info("Fetching all course names. Inside getAllCourseName()");
        return courseCatalogRepo.findAll().stream()
                .map(CourseCatalogEntity::getCourseName)
                .sorted(Comparable::compareTo)
                .toList();
    }

    @Override
    public CourseCatalogDto saveCourseCatalogDto(CourseCatalogDto courseCatalogDto) {
        if (courseCatalogDto == null) {
            throw new IllegalArgumentException("Course data cannot be null");
        }
        log.info("ENTER saveCourseCatalogDto() | catalogId={}", courseCatalogDto.getCatlogId());
        CourseCatalogEntity entity = CourseCatalogMapper.converToEntity(courseCatalogDto);
        CourseCatalogEntity saved = courseCatalogRepo.save(entity);
        log.info("EXIT saveCourseCatalogDto() | catalogId={}", saved.getCatlogId());
        return CourseCatalogMapper.convertToDto(saved);
    }

    @Override
    public Page<CourseCatalogDto> getCourseCatLog(int pageNumber, int pageSize) {
        log.info("ENTER getCourseCatLog() | pageNumber={} pageSize={}", pageNumber, pageSize);
        if (pageNumber < 0 || pageSize <= 0) {
            throw new IllegalArgumentException("Invalid pagination values");
        }
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.ASC, "catlogId"));
        Page<CourseCatalogEntity> page = courseCatalogRepo.findAll(pageRequest);
        log.info("EXIT getCourseCatLog() | totalRecords={}", page.getTotalElements());
        return page.map(CourseCatalogMapper::convertToDto);
    }

    @Override
    public Page<CourseCatalogDto> searchCatalogByParam(String param, int pageNumber, int pagesize) {
        log.info("ENTER searchCatalogByParam() | param={} pageNumber={} pageSize={}", param, pageNumber, pagesize);
        if (pageNumber < 0 || pagesize <= 0) {
            throw new IllegalArgumentException("Invalid pagination values");
        }
        PageRequest pageRequest = PageRequest.of(pageNumber, pagesize, Sort.by(Sort.Direction.ASC, "catlogId"));
        Page<CourseCatalogEntity> page = courseCatalogRepo.findByParam(param, pageRequest);
        log.info("EXIT searchCatalogByParam() | totalRecords={}", page.getTotalElements());
        return page.map(CourseCatalogMapper::convertToDto);
    }

    @Override
    public void deleteCatalog(String catalogId) {
        log.info("ENTER deleteCatalog() | catalogId={}", catalogId);
        CourseCatalogEntity entity = courseCatalogRepo.findById(catalogId)
                .orElseThrow(() -> {
                    log.warn("Delete failed — catalog not found: {}", catalogId);
                    return new DataNotFoundException("Course not found with id: " + catalogId);
                });
        courseCatalogRepo.delete(entity);
        log.info("EXIT deleteCatalog() | deletedId={}", catalogId);
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
