package com.avirat.tech.smt.controller;

import com.avirat.tech.smt.dto.InstallmentResponseDTO;
import com.avirat.tech.smt.service.InstallmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/installment")
public class InstallmentController {

    private static final Logger log = LoggerFactory.getLogger(InstallmentController.class);

    @Autowired
    private InstallmentService installmentService;

    @GetMapping("/search/{feesId}")
    public ResponseEntity<InstallmentResponseDTO> getInstallmentDetails(@PathVariable(name="feesId",required = true) Integer feesId){
        log.info("ENTER getInstallmentDetails() | feesId={}", feesId);
        if (feesId == null || feesId <= 0) {
            throw new IllegalArgumentException("feesId must be greater than 0");
        }
        InstallmentResponseDTO installmentResponseDTO = installmentService.getInstallment(feesId);
        log.info("EXIT getInstallmentDetails() | feesId={}", feesId);
        return ResponseEntity.ok(installmentResponseDTO);
    }
}
