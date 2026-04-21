package com.avirat.tech.smt.mapper;

import com.avirat.tech.smt.dto.TransactionDto;
import com.avirat.tech.smt.entity.TransactionEntity;

public class TransactionMapper {


    public static TransactionDto convertToDto(TransactionEntity transactionEntity){
        TransactionDto transactionDto=new TransactionDto();
        transactionDto.setTrnsDate(transactionEntity.getTrnsDate());
        transactionDto.setVerifyBy(transactionEntity.getVerifyBy());
        transactionDto.setAmountPaid(transactionEntity.getAmountPaid());
        return transactionDto;

    }

    public static  TransactionEntity convertToEntity(TransactionDto transactionDto){
        TransactionEntity transactionEntity=new TransactionEntity();
        transactionEntity.setTrnsDate(transactionDto.getTrnsDate());
        transactionEntity.setAmountPaid(transactionDto.getAmountPaid());
        transactionEntity.setVerifyBy(transactionDto.getVerifyBy());
        return transactionEntity;
    }
}
