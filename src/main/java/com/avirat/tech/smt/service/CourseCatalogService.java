package com.avirat.tech.smt.service;

import com.avirat.tech.smt.dto.CourseCatalogDto;
import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CourseCatalogService {

    public List<CourseCatalogDto> getCatalog();

    public CourseCatalogDto saveCourseCatalogDto(CourseCatalogDto courseCatalogDto);

    public Page<CourseCatalogDto> getCourseCatLog(int pageNumber, int PageSize);

    public CourseCatalogDto saveNewCatalog(CourseCatalogDto courseCatalogDto);

    public List<String> getAllCourseName();

    public Page<CourseCatalogDto> searchCatalogByParam(String param, int pageNumber, int pagesize);

   public  void deleteCatalog(String catalogId);


}
