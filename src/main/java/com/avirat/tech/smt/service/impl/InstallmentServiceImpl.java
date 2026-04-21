package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.constant.InstallmentRatio;
import com.avirat.tech.smt.dto.InstallmentResponseDTO;
import com.avirat.tech.smt.entity.*;
import com.avirat.tech.smt.exception.globalexception.DataNotFoundException;
import com.avirat.tech.smt.mapper.InstallmentMapper;
import com.avirat.tech.smt.repo.FeesRepo;
import com.avirat.tech.smt.repo.InstallmentRepo;
import com.avirat.tech.smt.repo.StudentRegistrationRepo;
import com.avirat.tech.smt.service.InstallmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class InstallmentServiceImpl implements InstallmentService {

    @Autowired
    private InstallmentRepo installmentRepo;

    @Autowired
    private FeesRepo feesRepo;

    @Autowired
    private StudentRegistrationRepo studentRegistrationRepo;

    @Override
    public void installmentGenerator(FeesEntity feesEntity, CourseCatalogEntity courseCatalogEntity) {

        InstallmentRatio installmentRatio = InstallmentRatio.getInstallmentRatio();
        Map<Integer, List<Long>> installRatioMap = installmentRatio.getInstallRatioMap();
        List<Long> longs = installRatioMap.get(courseCatalogEntity.getInstallments());
        int count=0;
        Boolean bool=false;
        for (int i=1;i<=courseCatalogEntity.getInstallments();i++){
            InstallmentEntity installmentEntity = InstallmentEntity.builder()
                    .installNumber(Long.parseLong(String.valueOf(i)))
                    .fees(feesEntity)
                    .intlmtTotalFees(feesEntity.getTotalFees() * (longs.get(count))/ 100L)
                    .intlmtPaidFees(0L)
                    .intlmtPending(feesEntity.getTotalFees() * (longs.get(count))/ 100L)
                    .build();
            this.installmentRepo.save(installmentEntity);
            // Add log
            count++;
            if(i==courseCatalogEntity.getInstallments())
                bool=true;

        }
        if (!bool)
            throw new RuntimeException("Unable to process of Installment");

    }

    @Override
    public InstallmentResponseDTO getInstallment(Integer feesId) {
        FeesEntity feesEntity = feesRepo.findById(feesId).orElseThrow(() -> new DataNotFoundException("Fees is not generated for Fees Id : " + feesId));
        List<InstallmentEntity> listInstallmentEntity = installmentRepo.findByFees(feesEntity).orElseThrow(() -> new DataNotFoundException("Installment is not available for fees Id : " + feesEntity.getFeesId()));
        StudentRegistrationEntity studentRegistrationEntity = studentRegistrationRepo.findByFeesEntity(feesEntity).orElseThrow(() -> new DataNotFoundException("Student is not found for for fees Id :" + feesEntity.getFeesId()));
        String stdFullName=studentRegistrationEntity.getFirstName()+" "+studentRegistrationEntity.getMiddleName()+" "+studentRegistrationEntity.getLastName();
            return InstallmentResponseDTO.builder()
                .installmentDTOS(listInstallmentEntity.stream().map(InstallmentMapper::convertToDto).toList())
                .regId(studentRegistrationEntity.getRegId())
                .academicYear(studentRegistrationEntity.getAcademicYear())
                .CourseName(studentRegistrationEntity.getCourse())
                .paindingFees(feesEntity.getPending())
                .paidFees(feesEntity.getPaidFees())
                .totalFees(feesEntity.getTotalFees())
                .standard(studentRegistrationEntity.getStandard())
                .stdFullName(stdFullName)
                .build();


    }
}
