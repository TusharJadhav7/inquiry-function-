package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.constant.FeesStatusConstant;
import com.avirat.tech.smt.dto.TransactionDto;
import com.avirat.tech.smt.dto.TransactionResponseDto;
import com.avirat.tech.smt.entity.FeesEntity;
import com.avirat.tech.smt.entity.InstallmentEntity;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import com.avirat.tech.smt.entity.TransactionEntity;
import com.avirat.tech.smt.exception.globalexception.DataNotFoundException;
import com.avirat.tech.smt.exception.globalexception.InvalidTransactionReqException;
import com.avirat.tech.smt.mapper.TransactionMapper;
import com.avirat.tech.smt.repo.FeesRepo;
import com.avirat.tech.smt.repo.InstallmentRepo;
import com.avirat.tech.smt.repo.StudentRegistrationRepo;
import com.avirat.tech.smt.repo.TransactionRepo;
import com.avirat.tech.smt.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private  TransactionRepo transactionRepo;

    @Autowired
    private InstallmentRepo installmentRepo;

    @Autowired
    private FeesRepo feesRepo;

    @Autowired
    private StudentRegistrationRepo studentRegistrationRepo;

    @Override
    public void addTransaction(Integer installmentId, TransactionDto transactionDto) {


        TransactionEntity transactionEntity = TransactionMapper.convertToEntity(transactionDto);
        InstallmentEntity installmentEntity = installmentRepo.findById(installmentId).orElseThrow(() -> new RuntimeException("Installment is not available for Installment Id : " + installmentId));
        transactionEntity.setInstallment(installmentEntity);
        if (transactionEntity.getAmountPaid()>installmentEntity.getIntlmtPending())
            throw new InvalidTransactionReqException("Transaction Amount is greater than installment Pending Amount");
        TransactionEntity transactionEntitySaved=transactionRepo.save(transactionEntity);
        installmentEntity.setIntlmtPending(installmentEntity.getIntlmtPending()-transactionEntitySaved.getAmountPaid());
        installmentEntity.setIntlmtPaidFees(installmentEntity.getIntlmtPaidFees()+transactionEntitySaved.getAmountPaid());
        InstallmentEntity installmentEntitySaved = installmentRepo.save(installmentEntity);
        FeesEntity feesEntity=feesRepo.findById(installmentEntitySaved.getFees().getFeesId()).orElseThrow(()-> new RuntimeException("Fees is not Found for Fees Id "+installmentEntitySaved.getFees().getFeesId()));
        feesEntity.setPending(feesEntity.getPending()-transactionEntitySaved.getAmountPaid());
        feesEntity.setPaidFees(feesEntity.getPaidFees()+transactionEntitySaved.getAmountPaid());
        if (feesEntity.getFeesId().equals(feesEntity.getPaidFees()) && feesEntity.getPending().equals(0))
            feesEntity.setFeesStatus(FeesStatusConstant.COMPLETED.toString());
        feesRepo.save(feesEntity);

    }

    @Override
    public TransactionResponseDto getTransaction(Integer installmentId) {
        InstallmentEntity installmentEntity = installmentRepo.findById(installmentId).orElseThrow(() -> new DataNotFoundException("Installment Is not found for installment Id " + installmentId));
        List<TransactionEntity> transactionEntities = transactionRepo.findByInstallment(installmentEntity).orElseThrow(() -> new DataNotFoundException("Transaction is not found for installment Id : " + installmentEntity.getInstallmentId()));
        FeesEntity feesEntity = feesRepo.findById(installmentEntity.getFees().getFeesId()).orElseThrow(() -> new DataNotFoundException("Fees is not found for installment id :" + installmentEntity.getInstallmentId()));
        StudentRegistrationEntity studentRegistrationEntity = studentRegistrationRepo.findByFeesEntity(feesEntity).orElseThrow(() -> new DataNotFoundException("Student is not found for fees id " + feesEntity.getFeesId()));
        String stdName=studentRegistrationEntity.getFirstName()+" "+studentRegistrationEntity.getMiddleName()+" "+studentRegistrationEntity.getLastName();
        return TransactionResponseDto.builder()
                .regId(studentRegistrationEntity.getRegId())
                .course(studentRegistrationEntity.getCourse())
                .stdName(stdName)
                .installmentNumber(installmentEntity.getInstallNumber())
                .transactionDto(transactionEntities.stream().map(TransactionMapper::convertToDto).toList())
                .installmentTotalFees(installmentEntity.getIntlmtTotalFees())
                .build();



    }
}
