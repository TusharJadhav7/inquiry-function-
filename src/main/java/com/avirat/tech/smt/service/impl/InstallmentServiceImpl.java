package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.constant.InstallmentRatio;
import com.avirat.tech.smt.entity.CatalogIdRecordEntity;
import com.avirat.tech.smt.entity.CourseCatalogEntity;
import com.avirat.tech.smt.entity.FeesEntity;
import com.avirat.tech.smt.entity.InstallmentEntity;
import com.avirat.tech.smt.repo.InstallmentRepo;
import com.avirat.tech.smt.service.InstallmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class InstallmentServiceImpl implements InstallmentService {

    @Autowired
    private InstallmentRepo installmentRepo;

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
}
