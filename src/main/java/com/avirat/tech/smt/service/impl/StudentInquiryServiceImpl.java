package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.dto.StudentInquiryDto;
import com.avirat.tech.smt.entity.InquiryIdRecordEntity;
import com.avirat.tech.smt.entity.StudentInquiryEntity;
import com.avirat.tech.smt.exception.globalexception.DataNotFoundException;
import com.avirat.tech.smt.mapper.StudentInquiryMapper;
import com.avirat.tech.smt.repo.InquiryIdRecordRepo;
import com.avirat.tech.smt.repo.StudenInquiryRepo;
import com.avirat.tech.smt.service.StudentInquiryService;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class StudentInquiryServiceImpl implements StudentInquiryService {

    private static final Logger log = LoggerFactory.getLogger((StudentInquiryServiceImpl.class));

    @Autowired
    private StudenInquiryRepo studentInquiryRepo;

    @Autowired
    private InquiryIdRecordRepo inquiryIdRecordRepo;

    @Override
    public StudentInquiryDto saveStudentInquiry(StudentInquiryDto dto) {
        log.info("ENTER saveStudentInquiry() | firstName={} lastName={}",
                dto.getFirstName(), dto.getLastName());

        StudentInquiryEntity entity = StudentInquiryMapper.convertToEntity(dto);
        String inquiryId = getIncrementedInquiryId();
        entity.setInquiryId(inquiryId);
        entity.setInquiryDate(LocalDate.now());

        StudentInquiryEntity saved = studentInquiryRepo.save(entity);
        updateInquiryId(inquiryId);

        log.info("EXIT saveStudentInquiry() | inquiryId={}", inquiryId);
        return StudentInquiryMapper.convertToDto(saved);
    }

    @Override
    public StudentInquiryDto getStudentInquiry(String inquiryId) {
        log.info("ENTER getStudentInquiry() | inquiryId={}", inquiryId);
        StudentInquiryEntity entity = studentInquiryRepo.findById(inquiryId)
                .orElseThrow(() -> {
                    log.warn("Inquiry not found with ID: {}", inquiryId);
                    return new DataNotFoundException("Inquiry not found with ID: " + inquiryId);
                });
        log.info("EXIT getStudentInquiry() | inquiryId={}", entity.getInquiryId());
        return StudentInquiryMapper.convertToDto(entity);
    }

    @Override
    public Page<StudentInquiryDto> searchInquiry(
            String inquiryId, String firstName, String lastName,
            String standard, int pageNumber, int pageSize) {
        log.info("ENTER searchInquiry() | inquiryId={} firstName={} standard={} pageNumber={} pageSize={}",
                inquiryId, firstName, standard, pageNumber, pageSize);

        if (pageNumber < 0 || pageSize <= 0) {
            throw new IllegalArgumentException("Invalid pagination values");
        }

        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.by(Sort.Direction.ASC, "firstName"));
        Page<StudentInquiryEntity> page = studentInquiryRepo.searchInquiries(
                emptyToNull(inquiryId),
                emptyToNull(firstName),
                emptyToNull(lastName),
                emptyToNull(standard),
                pageRequest);

        log.info("EXIT searchInquiry() | totalRecords={}", page.getTotalElements());
        return page.map(StudentInquiryMapper::convertToDto);
    }

    @Override
    public List<StudentInquiryDto> getAllInquiries() {
        log.info("Fetching all inquiries in getAllInquiries()");
        return studentInquiryRepo.findAll()
                .stream()
                .map(StudentInquiryMapper::convertToDto)
                .toList();
    }

    @Override
    public StudentInquiryDto updateInquiry(String inquiryId, StudentInquiryDto dto) {
        log.info("ENTER updateInquiry() | inquiryId={}", inquiryId);
        StudentInquiryEntity entity = studentInquiryRepo.findById(inquiryId)
                .orElseThrow(() -> {
                    log.warn("Update failed — inquiry not found: {}", inquiryId);
                    return new DataNotFoundException("Inquiry not found with ID: " + inquiryId);
                });

        // Partial update — only set fields that are not null (PATCH style)
        if (dto.getFirstName() != null)      entity.setFirstName(dto.getFirstName());
        if (dto.getMiddleName() != null)     entity.setMiddleName(dto.getMiddleName());
        if (dto.getLastName() != null)       entity.setLastName(dto.getLastName());
        if (dto.getCourse() != null)         entity.setCourse(dto.getCourse());
        if (dto.getStandard() != null)       entity.setStandard(dto.getStandard());
        if (dto.getParentMobNumber() != null) entity.setParentMobNumber(dto.getParentMobNumber());
        if (dto.getTotalFees() != null)      entity.setTotalFees(dto.getTotalFees());

        StudentInquiryEntity saved = studentInquiryRepo.save(entity);
        log.info("EXIT updateInquiry() | inquiryId={}", saved.getInquiryId());
        return StudentInquiryMapper.convertToDto(saved);
    }

     /*@Override
    public void deleteInquiry(String  inquiryId) {
        log.info("ENTER deleteInquiry() | inquiryId={}", inquiryId);
        StudentInquiryEntity entity = studentInquiryRepo.findById(inquiryId)
                .orElseThrow(() -> {
                    log.warn("Delete failed — inquiry not found: {}", inquiryId);
                    return new DataNotFoundException("Inquiry not found with ID: " + inquiryId);
                });
        studentInquiryRepo.delete(entity);
        log.info("EXIT deleteInquiry() | deletedId={}", inquiryId);
    }
*/
    // ── Helper Methods ────────────────────────────────────────────────────────

    private String emptyToNull(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value;
    }

    private String getIncrementedInquiryId() {
        Long maxRecordId = inquiryIdRecordRepo.findMaxinquiryId().orElse(0L);
        maxRecordId = maxRecordId+1;
        return "Inq-" + maxRecordId.toString();
    }

    private void updateInquiryId(String inquiryId) {
        String[] inqIdArray = inquiryId.split("-");
        InquiryIdRecordEntity entity = InquiryIdRecordEntity.builder()
                .inquiryrecordId(Long.valueOf(inqIdArray[1]))
                .build();
        inquiryIdRecordRepo.save(entity);

    }
}
