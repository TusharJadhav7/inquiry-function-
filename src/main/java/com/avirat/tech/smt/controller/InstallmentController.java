package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.InstallmentResponseDTO;
import com.avirat.tech.smt.service.InstallmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/installment")
public class InstallmentController {

    @Autowired
    private InstallmentService installmentService;

    @GetMapping("/search/{feesId}")
    public ResponseEntity<InstallmentResponseDTO> getInstallmentDetails(@PathVariable(name="feesId",required = true) Integer feesId){
        InstallmentResponseDTO installmentResponseDTO = installmentService.getInstallment(feesId);
        return ResponseEntity.ok(installmentResponseDTO);
    }
}
