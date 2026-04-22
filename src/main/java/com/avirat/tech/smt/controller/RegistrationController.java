package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import com.avirat.tech.smt.service.StudentRegistrationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/registration")
//@CrossOrigin(origins = "*")
public class RegistrationController {

    private static final Logger log = LoggerFactory.getLogger(RegistrationController.class);

    @Autowired
    private StudentRegistrationService studentRegistrationService;

    // ============ STUDENT CRUD ============

    /**
     * POST /registration — Register a new student
     */
    @PostMapping
    public ResponseEntity<String> registerStudent(@Valid @RequestBody StudentRegistrationDataDto dto) {
        log.info("ENTER registerStudent() | firstName={} lastName={}", dto.getFirstName(), dto.getLastName());
        StudentRegistrationDataDto saved = studentRegistrationService.saveStudentRegistration(dto);
        log.info("EXIT registerStudent() | regId={}", saved.getRegId());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Registered with " + saved.getRegId() + " Successfully");
    }

    /**
     * GET /registration — Get all students
     */
 /*   @GetMapping
    public ResponseEntity<List<StudentRegistrationDataDto>> getAllStudents() {
        log.info("GET /registration — fetching all students");
        return ResponseEntity.ok(studentRegistrationService.getAllStudents());
    }
*/
    /**
     * GET /registration/{regId} — Get student by registration ID
     */
 /*   @GetMapping("/{regId}")
    public ResponseEntity<StudentRegistrationDataDto> getStudentById(@PathVariable String regId) {
        log.info("GET /registration/{} — fetching student", regId);
        return ResponseEntity.ok(studentRegistrationService.getStudentRegistration(regId));
    }
*/
    /**
     * GET /registration/search — Multi-parameter student search (paginated)
     */
    @GetMapping("/search")
    public ResponseEntity<Page<StudentRegistrationDataDto>> searchStudents(
            @RequestParam(required = false) String regId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String standard,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String adhar,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize) {

        log.info("ENTER searchStudents() | regId={} firstName={} lastName={} course={} pageNumber={} pageSize={}",
                regId, firstName, lastName, course, pageNumber, pageSize);
        Page<StudentRegistrationDataDto> results = studentRegistrationService.searchStudent(
                regId, firstName, lastName, course, standard, email, adhar, pageNumber, pageSize);
        log.info("EXIT searchStudents() | totalRecords={}", results.getTotalElements());
        return ResponseEntity.ok(results);
    }

    /**
     * PATCH /registration/update-student/{regId} — Partial update student
     */
    @PatchMapping("/update-student/{regId}")
    public ResponseEntity<StudentRegistrationDataDto> updateStudent(
            @PathVariable String regId,
            @RequestBody StudentRegistrationDataDto dto) {
        log.info("ENTER updateStudent() | regId={}", regId);
        if (regId == null || regId.trim().isEmpty()) {
            throw new IllegalArgumentException("regId cannot be empty");
        }
        log.info("EXIT updateStudent() | regId={}", regId);
        return ResponseEntity.ok(studentRegistrationService.updateStudent(regId, dto));
    }

    /**
     * DELETE /registration/delete-student/{regId} — Delete a student
     */
    @DeleteMapping("/delete-student/{regId}")
    public ResponseEntity<String> deleteStudent(@PathVariable String regId) {
        log.info("ENTER deleteStudent() | regId={}", regId);
        if (regId == null || regId.trim().isEmpty()) {
            throw new IllegalArgumentException("regId cannot be empty");
        }
        studentRegistrationService.deleteStudent(regId);
        log.info("EXIT deleteStudent() | regId={}", regId);
        return ResponseEntity.ok("Student " + regId + " deleted successfully");
    }

    // ============ FEES ENDPOINTS ============

    /**
     * PUT /registration/{regId}/fees — Pay an installment
     * Body: { "paidAmount": 15000 }
     */
  /*  @PutMapping("/{regId}/fees")
    public ResponseEntity<StudentRegistrationDataDto> updateFees(
            @PathVariable String regId,
            @RequestBody Map<String, Long> body) {
        Long paidAmount = body.get("paidAmount");
        if (paidAmount == null || paidAmount <= 0) {
            log.warn("PUT /registration/{}/fees — invalid paidAmount: {}", regId, paidAmount);
            return ResponseEntity.badRequest().build();
        }
        log.info("PUT /registration/{}/fees — paying ₹{}", regId, paidAmount);
        return ResponseEntity.ok(studentRegistrationService.updateStudentFees(regId, paidAmount));
    }
*/
    /**
     * DELETE /registration/{regId}/fees/reset — Reset fees
     */
  /*  @DeleteMapping("/{regId}/fees/reset")
    public ResponseEntity<String> resetFees(@PathVariable String regId) {
        log.info("DELETE /registration/{}/fees/reset", regId);
        studentRegistrationService.resetStudentFees(regId);
        return ResponseEntity.ok("Fees reset for student " + regId);
    }

   */

}
