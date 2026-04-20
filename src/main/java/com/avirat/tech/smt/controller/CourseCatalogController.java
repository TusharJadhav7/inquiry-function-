package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.CourseCatalogDto;
import com.avirat.tech.smt.service.CourseCatalogService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RestController
@RequestMapping("/catalog")
public class CourseCatalogController {

    @Autowired
    private CourseCatalogService courseCatalogService;

    @PostMapping
    public ResponseEntity<String> saveCatlog(@RequestBody CourseCatalogDto courseCatalogDto){
        CourseCatalogDto courseCatalogDto1 = courseCatalogService.saveNewCatalog(courseCatalogDto);
        return ResponseEntity.ok("Course is saved with "+courseCatalogDto1.getCatlogId()+" Course Id");
    }

    @GetMapping
    public ResponseEntity<Page<CourseCatalogDto>> getCourseCatalog(@PathVariable(name="pageNumber",required = false) Integer pageNumber,@PathVariable(name = "pageSize",required = false) Integer pageSize){
        Page<CourseCatalogDto> courseCatLog = courseCatalogService.getCourseCatLog(pageNumber, pageSize);
        return ResponseEntity.ok(courseCatLog);
    }

    @DeleteMapping("/delete-student/{catalogId}")
    public ResponseEntity<String> deleteCatalog(@PathVariable String catalogId) {
        courseCatalogService.deleteCatalog(catalogId);
        return ResponseEntity.ok("Catalog with ID " + catalogId + " deleted successfully.");
    }
}
