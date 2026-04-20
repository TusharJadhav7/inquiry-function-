package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import com.avirat.tech.smt.entity.RegistrationIdRecordEntity;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import com.avirat.tech.smt.mapper.StudentRegistrationMapper;
import com.avirat.tech.smt.repo.RegistrationIdRecordRepo;
import com.avirat.tech.smt.repo.StudentRegistrationRepo;
import com.avirat.tech.smt.service.StudentRegistrationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentRegistrationServiceImpl implements StudentRegistrationService {

    private static final Logger log = LoggerFactory.getLogger(StudentRegistrationServiceImpl.class);

    @Autowired
    private StudentRegistrationRepo studentRegistrationRepo;

    @Autowired
    private RegistrationIdRecordRepo registrationIdRecordRepo;

    @Override
    public StudentRegistrationDataDto saveStudentRegistration(StudentRegistrationDataDto dto) {
        log.info("Registering new student: {} {}", dto.getFirstName(), dto.getLastName());
        StudentRegistrationEntity entity = StudentRegistrationMapper.convertToEntity(dto);
        String regId = getIncrementedRegId();
        entity.setRegId(regId);
        StudentRegistrationEntity saved = studentRegistrationRepo.save(entity);
        updateRegId(regId);
        log.info("Student registered successfully with ID: {}", regId);
        return StudentRegistrationMapper.convertToDto(saved);
    }

    @Override
    public StudentRegistrationDataDto getStudentRegistration(String regId) {
        log.info("Fetching student by ID: {}", regId);
        StudentRegistrationEntity entity = studentRegistrationRepo.findById(regId)
                .orElseThrow(() -> {
                    log.warn("Student not found with ID: {}", regId);
                    return new RuntimeException("Student not found with ID: " + regId);
                });
        return StudentRegistrationMapper.convertToDto(entity);
    }

    @Override
    public Page<StudentRegistrationDataDto> searchStudent(
            String regId, String firstName, String lastName,
            String course, String standard, String email,
            String adhar, int pageNumber, int pageSize) {

        // Auto-prefix "Reg-" if user typed just a number
        regId = emptyToNull(regId);
        if (regId != null && !regId.toLowerCase().startsWith("reg-")) {
            regId = "Reg-" + regId;
        }

        log.info("Searching students — regId={}, firstName={}, course={}, page={}", regId, firstName, course, pageNumber);

        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.ASC, "firstName"));
        Page<StudentRegistrationEntity> page = studentRegistrationRepo.searchStudents(
                regId,
                emptyToNull(firstName),
                emptyToNull(lastName),
                emptyToNull(course),
                emptyToNull(standard),
                emptyToNull(email),
                emptyToNull(adhar),
                pageRequest);

        log.info("Search returned {} results (page {} of {})", page.getTotalElements(), pageNumber, page.getTotalPages());
        return page.map(StudentRegistrationMapper::convertToDto);
    }

    @Override
    public List<StudentRegistrationDataDto> getAllStudents() {
        log.info("Fetching all students");
        return studentRegistrationRepo.findAll()
                .stream()
                .map(StudentRegistrationMapper::convertToDto)
                .toList();
    }

    @Override
    public StudentRegistrationDataDto updateStudent(String regId, StudentRegistrationDataDto dto) {
        log.info("Updating student: {}", regId);
        StudentRegistrationEntity entity = studentRegistrationRepo.findById(regId)
                .orElseThrow(() -> {
                    log.warn("Update failed — student not found: {}", regId);
                    return new RuntimeException("Student not found with ID: " + regId);
                });

        // Partial update — only set fields that are not null (PATCH style)
        if (dto.getFirstName() != null) entity.setFirstName(dto.getFirstName());
        if (dto.getMiddleName() != null) entity.setMiddleName(dto.getMiddleName());
        if (dto.getLastName() != null) entity.setLastName(dto.getLastName());
        if (dto.getMotherName() != null) entity.setMotherName(dto.getMotherName());
        if (dto.getGuardianName() != null) entity.setGuardianName(dto.getGuardianName());
        if (dto.getDateOfBirth() != null) entity.setDateOfBirth(dto.getDateOfBirth());
        if (dto.getGender() != null) entity.setGender(dto.getGender());
        if (dto.getCourse() != null) entity.setCourse(dto.getCourse());
        if (dto.getStandard() != null) entity.setStandard(dto.getStandard());
        if (dto.getCourseDuration() != null) entity.setCourseDuration(dto.getCourseDuration());
        if (dto.getAcademicYear() != null) entity.setAcademicYear(dto.getAcademicYear());
        if (dto.getAcademicGroup() != null) entity.setAcademicGroup(dto.getAcademicGroup());
        if (dto.getAdmissionDate() != null) entity.setAdmissionDate(dto.getAdmissionDate());
        if (dto.getSchoolCollegeName() != null) entity.setSchoolCollegeName(dto.getSchoolCollegeName());
        if (dto.getAddress() != null) entity.setAddress(dto.getAddress());
        if (dto.getParentAddress() != null) entity.setParentAddress(dto.getParentAddress());
        if (dto.getStdMobNumber() != null) entity.setStdMobNumber(dto.getStdMobNumber());
        if (dto.getParentMobNumber() != null) entity.setParentMobNumber(dto.getParentMobNumber());
        if (dto.getGuardianMobileNumber() != null) entity.setGuardianMobileNumber(dto.getGuardianMobileNumber());
        if (dto.getEmail() != null) entity.setEmail(dto.getEmail());
        if (dto.getParentEmail() != null) entity.setParentEmail(dto.getParentEmail());
        if (dto.getTotalFees() != null) entity.setTotalFees(dto.getTotalFees());
        if (dto.getPaidFees() != null) entity.setPaidFees(dto.getPaidFees());
        if (dto.getRemainingFees() != null) entity.setRemainingFees(dto.getRemainingFees());
        if (dto.getAdharCardNumber() != null) entity.setAdharCardNumber(dto.getAdharCardNumber());

        StudentRegistrationEntity saved = studentRegistrationRepo.save(entity);
        log.info("Student {} updated successfully", regId);
        return StudentRegistrationMapper.convertToDto(saved);
    }

    @Override
    public void deleteStudent(String regId) {
        log.info("Deleting student: {}", regId);
        StudentRegistrationEntity entity = studentRegistrationRepo.findById(regId)
                .orElseThrow(() -> {
                    log.warn("Delete failed — student not found: {}", regId);
                    return new RuntimeException("Student not found with ID: " + regId);
                });
        studentRegistrationRepo.delete(entity);
        log.info("Student {} deleted successfully", regId);
    }

    // ============ FEES OPERATIONS ============

    @Override
    public StudentRegistrationDataDto updateStudentFees(String regId, Long paidAmount) {
        log.info("Recording fee payment for student {}: ₹{}", regId, paidAmount);
        StudentRegistrationEntity student = studentRegistrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + regId));

        Long currentPaid = student.getPaidFees() != null ? student.getPaidFees() : 0L;
        Long newPaid = currentPaid + paidAmount;
        student.setPaidFees(newPaid);
        student.setRemainingFees(student.getTotalFees() - newPaid);

        StudentRegistrationEntity updated = studentRegistrationRepo.save(student);
        log.info("Fee updated for {} — Total paid: ₹{}, Remaining: ₹{}", regId, newPaid, student.getRemainingFees());
        return StudentRegistrationMapper.convertToDto(updated);
    }

    @Override
    public void resetStudentFees(String regId) {
        log.info("Resetting fees for student: {}", regId);
        StudentRegistrationEntity student = studentRegistrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + regId));
        student.setPaidFees(0L);
        student.setRemainingFees(student.getTotalFees());
        studentRegistrationRepo.save(student);
        log.info("Fees reset for student {}", regId);
    }

    // ============ HELPERS ============

    private String emptyToNull(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value;
    }

    private String getIncrementedRegId() {
        Long maxRecordId = registrationIdRecordRepo.findMaxRecordId().orElse(0L);
        maxRecordId = maxRecordId + 1;
        return "Reg-" + maxRecordId.toString();
    }

    private void updateRegId(String regId) {
        String[] regIdArray = regId.split("-");
        RegistrationIdRecordEntity entity = RegistrationIdRecordEntity.builder()
                .recordId(Long.valueOf(regIdArray[1]))
                .build();
        registrationIdRecordRepo.save(entity);
    }
}
