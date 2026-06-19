package com.avirat.tech.smt.controller;


import com.avirat.tech.smt.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/receipt")

public class PdfGeneratorController {

    @Autowired
    private PdfService pdfService;

    @GetMapping("/pdf/{feesId}")
    public ResponseEntity<byte[]> generateInvoice(@PathVariable(name="feesId",required = true) Integer feesId) throws Exception{

        byte[] pdfOfReceipt = pdfService.generatePdf(feesId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Receipt.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfOfReceipt);


    }
}
