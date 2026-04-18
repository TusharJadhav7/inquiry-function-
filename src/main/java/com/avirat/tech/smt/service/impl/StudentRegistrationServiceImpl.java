package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.dto.StudentRegistrationDataDto;
import com.avirat.tech.smt.entity.RegistrationIdRecordEntity;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import com.avirat.tech.smt.mapper.StudentRegistrationMapper;
import com.avirat.tech.smt.repo.RegistrationIdRecordRepo;
import com.avirat.tech.smt.repo.StudentRegistrationRepo;
import com.avirat.tech.smt.service.StudentRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentRegistrationServiceImpl implements StudentRegistrationService {

    @Autowired
    private StudentRegistrationRepo studentRegistrationRepo;

    @Autowired
    private RegistrationIdRecordRepo registrationIdRecordRepo;

    @Override
    public StudentRegistrationDataDto saveStudentRegistration(StudentRegistrationDataDto studentRegistrationDataDto) {
        StudentRegistrationEntity studentRegistrationEntity = StudentRegistrationMapper.convertToEntity(studentRegistrationDataDto);
        String regId=getIncrementedRegId();
        studentRegistrationEntity.setRegId(regId);
        StudentRegistrationEntity  savedStudentRegistrationEntity=studentRegistrationRepo.save(studentRegistrationEntity);
        updateRegId(regId);
        return  StudentRegistrationMapper.convertToDto(savedStudentRegistrationEntity);
    }

    @Override
    public StudentRegistrationDataDto getStudentRegistration(String regId) {
        StudentRegistrationEntity  studentRegistrationEntity=studentRegistrationRepo.findById(regId).orElseThrow(()-> new RuntimeException("Student is not available with"+regId));
        return StudentRegistrationMapper.convertToDto(studentRegistrationEntity);
    }

    @Override
    public Page<StudentRegistrationDataDto> searchStudent(
            String regId,
            String firstName,
            String lastName,
            String course,
            String standard,
            String email,
            String adhar,
            int pageNumber,
            int pageSize
    ) {

        regId = emptyToNull(regId);

        if (regId != null && !regId.toLowerCase().startsWith("reg-")) {
            regId = "Reg-" + regId;
        }

        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.Direction.ASC, "firstName");

        Page<StudentRegistrationEntity> page =
                studentRegistrationRepo.searchStudents(
                        emptyToNull(regId),
                        emptyToNull(firstName),
                        emptyToNull(lastName),
                        emptyToNull(course),
                        emptyToNull(standard),
                        emptyToNull(email),
                        emptyToNull(adhar),
                        pageRequest
                );

        return page.map(StudentRegistrationMapper::convertToDto);
    }

    private String emptyToNull(String value) {
        return (value == null || value.trim().isEmpty()) ? null : value;
    }

    private String getIncrementedRegId(){
        Long maxRecordId=registrationIdRecordRepo.findMaxRecordId().orElse(Long.parseLong("001"));
        if(maxRecordId!=1)
          maxRecordId=maxRecordId+1;
        return "Reg-"+maxRecordId.toString();
    }

    private void updateRegId(String regId){
        String[] regIdArray=regId.split("-");
        RegistrationIdRecordEntity maxRegistrationIdRecordEntity = RegistrationIdRecordEntity.builder()
                .recordId(Long.valueOf(regIdArray[1]))
                .build();
        registrationIdRecordRepo.save(maxRegistrationIdRecordEntity);

    }


    @Override
    public StudentRegistrationDataDto updateStudent(String regId, StudentRegistrationDataDto dto) {

        StudentRegistrationEntity entity = studentRegistrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + regId));

        if (dto.getFirstName() != null)
            entity.setFirstName(dto.getFirstName());
        if (dto.getMiddleName() != null)
            entity.setMiddleName(dto.getMiddleName());
        if (dto.getLastName() != null)
            entity.setLastName(dto.getLastName());
        if (dto.getMotherName() != null)
            entity.setMotherName(dto.getMotherName());
        if (dto.getDateOfBirth() != null)
            entity.setDateOfBirth(dto.getDateOfBirth());
        if (dto.getGender() != null)
            entity.setGender(dto.getGender());
        if (dto.getCourse() != null)
            entity.setCourse(dto.getCourse());
        if (dto.getStandard() != null)
            entity.setStandard(dto.getStandard());
        if (dto.getAdmissionDate() != null)
            entity.setAdmissionDate(dto.getAdmissionDate());
        if (dto.getSchoolCollegeName() != null)
            entity.setSchoolCollegeName(dto.getSchoolCollegeName());
        if (dto.getAddress() != null)
            entity.setAddress(dto.getAddress());
        if (dto.getStdMobNumber() != null)
            entity.setStdMobNumber(dto.getStdMobNumber());
        if (dto.getParentMobNumber() != null)
            entity.setParentMobNumber(dto.getParentMobNumber());
        if (dto.getEmail() != null)
            entity.setEmail(dto.getEmail());
        if (dto.getTotalFees() != null)
            entity.setTotalFees(dto.getTotalFees());
        if (dto.getPaidFees() != null)
            entity.setPaidFees(dto.getPaidFees());
        if (dto.getRemainingFees() != null)
            entity.setRemainingFees(dto.getRemainingFees());
        if (dto.getAdharCardNumber() != null)
            entity.setAdharCardNumber(dto.getAdharCardNumber());

        StudentRegistrationEntity saved = studentRegistrationRepo.save(entity);
        return StudentRegistrationMapper.convertToDto(saved);
    }

    @Override
    public void deleteStudent(String regId) {

        StudentRegistrationEntity entity = studentRegistrationRepo.findById(regId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        studentRegistrationRepo.delete(entity);
    }

}
