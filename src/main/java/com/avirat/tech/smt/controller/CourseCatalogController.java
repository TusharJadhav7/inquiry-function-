package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.CourseCatalogDto;
import com.avirat.tech.smt.service.CourseCatalogService;
import jakarta.validation.Valid;
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
//@CrossOrigin(origins = "*")
public class CourseCatalogController {

    private static final Logger log = LoggerFactory.getLogger(CourseCatalogController.class);

    @Autowired
    private CourseCatalogService courseCatalogService;

    @PostMapping
    public ResponseEntity<String> saveCatalog(@Valid @RequestBody CourseCatalogDto courseCatalogDto) {
        log.info("ENTER saveCatalog() | courseName={}", courseCatalogDto.getCourseName());
        CourseCatalogDto saved = courseCatalogService.saveNewCatalog(courseCatalogDto);
        log.info("EXIT saveCatalog() | savedId={}", saved.getCatlogId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Course saved with " + saved.getCatlogId() + " Course Id");
    }

    @GetMapping("/all")
    public ResponseEntity<Page<CourseCatalogDto>> getCourseCatalog(
            @RequestParam(name = "pageNumber", required = false, defaultValue = "0") int pageNumber,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize) {
        log.info("ENTER getCourseCatalog() | pageNumber={} pageSize={}", pageNumber, pageSize);
        Page<CourseCatalogDto> courseCatLog = courseCatalogService.getCourseCatLog(pageNumber, pageSize);
        log.info("EXIT getCourseCatalog() | totalRecords={}", courseCatLog.getTotalElements());
        return ResponseEntity.ok(courseCatLog);
    }

 /*   @GetMapping("/all")
    public ResponseEntity<List<CourseCatalogDto>> getAllCourses() {
        log.info("GET /catalog/all — fetching all courses");
        return ResponseEntity.ok(courseCatalogService.getCatalog());
    }
*/
    @GetMapping("/names")
    public ResponseEntity<List<String>> getAllCourseNames() {
        log.info("ENTER getAllCourseNames()");
        List<String> names = courseCatalogService.getAllCourseName();
        log.info("EXIT getAllCourseNames() | totalNames={}", names.size());
        return ResponseEntity.ok(names);
    }

    @PutMapping("/{catalogId}")
    public ResponseEntity<CourseCatalogDto> updateCatalog(
            @PathVariable String catalogId,
            @Valid@RequestBody CourseCatalogDto courseCatalogDto) {
        log.info("ENTER updateCatalog() | catalogId={}", catalogId);
        courseCatalogDto.setCatlogId(catalogId);
        CourseCatalogDto updated = courseCatalogService.saveCourseCatalogDto(courseCatalogDto);
        log.info("EXIT updateCatalog() | updatedId={}", updated.getCatlogId());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete-course/{catalogId}")
    public ResponseEntity<String> deleteCatalog(@PathVariable String catalogId) {
        log.info("ENTER deleteCatalog() | catalogId={}", catalogId);
        courseCatalogService.deleteCatalog(catalogId);
        log.info("EXIT deleteCatalog() | deletedId={}", catalogId);
        return ResponseEntity.ok("Catalog with ID " + catalogId + " deleted successfully.");
    }
}
