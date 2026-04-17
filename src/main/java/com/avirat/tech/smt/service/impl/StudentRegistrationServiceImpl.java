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
    public Page<StudentRegistrationDataDto> searchStudentByParam(String param,int pageNumber,int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, Sort.Direction.ASC);
        Page<StudentRegistrationEntity> studentRegistrationEntityPage = studentRegistrationRepo.findByParam(param, pageRequest);
        return studentRegistrationEntityPage.map(studentRegistrationEntity -> StudentRegistrationMapper.convertToDto(studentRegistrationEntity));
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

}
