package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.TransactionDto;
import com.avirat.tech.smt.dto.TransactionResponseDto;
import com.avirat.tech.smt.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/gen/{installmentId}")
    public ResponseEntity<String> saveTransaction(@PathVariable("installmentId") Integer installmentId, @RequestBody TransactionDto transactionDto)
    {
        transactionService.addTransaction(installmentId,transactionDto);
        return  ResponseEntity.ok("Transaction is successfull");
    }

    @GetMapping("/{installmentId}")
    public ResponseEntity<TransactionResponseDto> getTransactionDetails(@PathVariable("installmentId") Integer intallmentId){
        TransactionResponseDto transaction = transactionService.getTransaction(intallmentId);
        return ResponseEntity.ok(transaction);
    }
}
