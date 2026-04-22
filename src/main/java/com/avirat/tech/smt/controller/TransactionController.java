package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.TransactionDto;
import com.avirat.tech.smt.dto.TransactionResponseDto;
import com.avirat.tech.smt.service.TransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    private static final Logger log = LoggerFactory.getLogger(TransactionController.class);

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/gen/{installmentId}")
    public ResponseEntity<String> saveTransaction(@PathVariable("installmentId") Integer installmentId, @RequestBody TransactionDto transactionDto)
    {
        log.info("ENTER saveTransaction() | installmentId={}", installmentId);
        if (installmentId == null || installmentId <= 0) {
            throw new IllegalArgumentException("installmentId must be greater than 0");
        }

        if (transactionDto == null) {
            throw new IllegalArgumentException("Transaction data cannot be null");
        }
        transactionService.addTransaction(installmentId,transactionDto);
        log.info("EXIT saveTransaction() | installmentId={}", installmentId);
        return  ResponseEntity.ok("Transaction is successfull");
    }

    @GetMapping("/{installmentId}")
    public ResponseEntity<TransactionResponseDto> getTransactionDetails(@PathVariable("installmentId") Integer intallmentId){
        log.info("ENTER getTransactionDetails() | installmentId={}", intallmentId);
        if (intallmentId == null || intallmentId <= 0) {
            throw new IllegalArgumentException("installmentId must be greater than 0");
        }
        TransactionResponseDto transaction = transactionService.getTransaction(intallmentId);
        log.info("EXIT getTransactionDetails() | installmentId={}", intallmentId);
        return ResponseEntity.ok(transaction);
    }
}
