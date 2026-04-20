package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.CourseCatalogDto;
import com.avirat.tech.smt.service.CourseCatalogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/catalog")
@CrossOrigin(origins = "*")
public class CourseCatalogController {

    private static final Logger log = LoggerFactory.getLogger(CourseCatalogController.class);

    @Autowired
    private CourseCatalogService courseCatalogService;

    @PostMapping
    public ResponseEntity<String> saveCatalog(@RequestBody CourseCatalogDto courseCatalogDto) {
        log.info("POST /catalog — saving course: {}", courseCatalogDto.getCourseName());
        CourseCatalogDto saved = courseCatalogService.saveNewCatalog(courseCatalogDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Course saved with " + saved.getCatlogId() + " Course Id");
    }

    @GetMapping
    public ResponseEntity<Page<CourseCatalogDto>> getCourseCatalog(
            @RequestParam(name = "pageNumber", required = false, defaultValue = "0") int pageNumber,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize) {
        log.info("GET /catalog — page={}, size={}", pageNumber, pageSize);
        Page<CourseCatalogDto> courseCatLog = courseCatalogService.getCourseCatLog(pageNumber, pageSize);
        return ResponseEntity.ok(courseCatLog);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CourseCatalogDto>> getAllCourses() {
        log.info("GET /catalog/all — fetching all courses");
        return ResponseEntity.ok(courseCatalogService.getCatalog());
    }

    @GetMapping("/names")
    public ResponseEntity<List<String>> getAllCourseNames() {
        log.info("GET /catalog/names — fetching course names");
        return ResponseEntity.ok(courseCatalogService.getAllCourseName());
    }

    @PutMapping("/{catalogId}")
    public ResponseEntity<CourseCatalogDto> updateCatalog(
            @PathVariable String catalogId,
            @RequestBody CourseCatalogDto courseCatalogDto) {
        log.info("PUT /catalog/{} — updating course", catalogId);
        courseCatalogDto.setCatlogId(catalogId);
        CourseCatalogDto updated = courseCatalogService.saveCourseCatalogDto(courseCatalogDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete-course/{catalogId}")
    public ResponseEntity<String> deleteCatalog(@PathVariable String catalogId) {
        log.info("DELETE /catalog/delete-course/{}", catalogId);
        courseCatalogService.deleteCatalog(catalogId);
        return ResponseEntity.ok("Catalog with ID " + catalogId + " deleted successfully.");
    }
}
