package com.avirat.tech.smt.service;

import com.avirat.tech.smt.dto.FeesDto;
import com.avirat.tech.smt.dto.FeesResponseDto;
import com.avirat.tech.smt.dto.TransactionDto;
import com.avirat.tech.smt.dto.TransactionResponseDto;

import java.util.List;

public interface TransactionService {

    public void addTransaction(Integer installmentId, TransactionDto transactionDto);

    public TransactionResponseDto getTransaction(Integer installmentId);

}
