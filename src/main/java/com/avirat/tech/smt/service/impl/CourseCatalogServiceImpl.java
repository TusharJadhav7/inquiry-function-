package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.dto.CourseCatalogDto;
import com.avirat.tech.smt.entity.CatalogIdRecordEntity;
import com.avirat.tech.smt.entity.CourseCatalogEntity;
import com.avirat.tech.smt.entity.RegistrationIdRecordEntity;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import com.avirat.tech.smt.mapper.CourseCatalogMapper;
import com.avirat.tech.smt.mapper.StudentRegistrationMapper;
import com.avirat.tech.smt.repo.CatalogIdRecordRepo;
import com.avirat.tech.smt.repo.CourseCatalogRepo;
import com.avirat.tech.smt.service.CourseCatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
@Service
public class CourseCatalogServiceImpl implements CourseCatalogService {

    @Autowired
    private CourseCatalogRepo courseCatalogRepo;

    @Autowired
    private CatalogIdRecordRepo catalogIdRecordRepo;

    @Override
    public List<CourseCatalogDto> getCatalog() {
        List<CourseCatalogDto> listOfCourseCatalog = courseCatalogRepo.findAll().stream().map(courseCatalogEntity -> CourseCatalogMapper.convertToDto(courseCatalogEntity)).toList();
        return listOfCourseCatalog;
    }

    @Override
    public CourseCatalogDto saveNewCatalog(CourseCatalogDto courseCatalogDto) {
        CourseCatalogEntity courseCatalogEntity = CourseCatalogMapper.converToEntity(courseCatalogDto);
        String maxCatlogId=getIncrementedCatId();
        courseCatalogEntity.setCatlogId(maxCatlogId);
        CourseCatalogEntity saveCourseCatalog = courseCatalogRepo.save(courseCatalogEntity);
        updateCatId(maxCatlogId);
        return CourseCatalogMapper.convertToDto(saveCourseCatalog);
    }

    @Override
    public List<String> getAllCourseName() {
        return courseCatalogRepo.findAll().stream().map(courseCatalogEntity -> courseCatalogEntity.getCourseName()).sorted(Comparable::compareTo).toList();
    }

    @Override
    public CourseCatalogDto saveCourseCatalogDto(CourseCatalogDto courseCatalogDto) {
        CourseCatalogEntity courseCatalogEntity = CourseCatalogMapper.converToEntity(courseCatalogDto);
        CourseCatalogEntity savedCourseCatalog = courseCatalogRepo.save(courseCatalogEntity);
        return CourseCatalogMapper.convertToDto(savedCourseCatalog);
    }

    @Override
    public Page<CourseCatalogDto> getCourseCatLog(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.Direction.ASC);
        Page<CourseCatalogEntity> courseCatalogEntityPage = courseCatalogRepo.findAll(pageRequest);
        return courseCatalogEntityPage.map(courseCatalogEntity -> CourseCatalogMapper.convertToDto(courseCatalogEntity));
    }


    @Override
    public Page<CourseCatalogDto> searchCatalogByParam(String param, int pageNumber, int pagesize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pagesize, Sort.Direction.ASC);
        Page<CourseCatalogEntity> courseCatalogEntityPage = courseCatalogRepo.findByParam(param, pageRequest);
        return courseCatalogEntityPage.map(courseCatalogEntity -> CourseCatalogMapper.convertToDto(courseCatalogEntity));

    }

    private String getIncrementedCatId(){

        Long maxRecordId=catalogIdRecordRepo.findMaxRecordId().orElse(Long.parseLong("001"));
        return "Cat-"+maxRecordId.toString();
    }
    private void updateCatId(String regId){
        String[] regIdArray=regId.split("-");
        CatalogIdRecordEntity catalogIdRecordEntity =CatalogIdRecordEntity.builder()
                .catalogId(Long.valueOf(regIdArray[1]))
                .build();
        catalogIdRecordRepo.save(catalogIdRecordEntity);

    }
}
