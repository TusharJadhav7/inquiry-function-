package com.avirat.tech.smt.service.impl;

import com.avirat.tech.smt.entity.FeesEntity;
import com.avirat.tech.smt.entity.InstallmentEntity;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import com.avirat.tech.smt.exception.globalexception.DataNotFoundException;
import com.avirat.tech.smt.pdfgenerator.HtmlProcessor;
import com.avirat.tech.smt.repo.FeesRepo;
import com.avirat.tech.smt.repo.InstallmentRepo;
import com.avirat.tech.smt.repo.StudentRegistrationRepo;
import com.avirat.tech.smt.service.PdfService;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.PrintsPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.print.PrintOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Base64;
import java.util.List;

@Service
public class PdfServiceImpl implements PdfService {

    @Autowired
    private StudentRegistrationRepo studentRegistrationRepo;

    @Autowired
    private FeesRepo feesRepo;

    @Autowired
    private InstallmentRepo installmentRepo;

/*
    @Override
    public byte[] generatePdf(Integer feesId) throws IOException, InterruptedException {

        FeesEntity feesEntity = feesRepo.findById(feesId).orElseThrow(() -> new DataNotFoundException("Fees Not found for fees Id : " + feesId));
        StudentRegistrationEntity studentRegistrationEntity = studentRegistrationRepo.findByFeesEntity(feesEntity).orElseThrow(() -> new DataNotFoundException("Student is not Found for Fees Id :" + feesEntity.getFeesId()));
        List<InstallmentEntity> installmentEntities = installmentRepo.findByFees(feesEntity).orElseThrow(() -> new DataNotFoundException("Installment is not found for fees Id :" + feesEntity.getFeesId()));
        String process = HtmlProcessor.process(feesEntity, installmentEntities, studentRegistrationEntity);

        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();

        options.addArguments("--headless=new");
        options.addArguments("--disable-gpu");
        WebDriver driver = new ChromeDriver(options);
        // Create temp html file
        Path tempFile = Files.createTempFile("pdf", ".html");

        Files.writeString(tempFile, process);

        // Load HTML file
        driver.get(tempFile.toUri().toString());

        // Wait for rendering
        Thread.sleep(2000);
        String pdfBase64 =
                ((PrintsPage) driver)
                        .print(new PrintOptions())
                        .getContent();

        return Base64.getDecoder().decode(pdfBase64);

    }
    */



    @Override
    public byte[] generatePdf(Integer feesId) throws IOException {

        FeesEntity feesEntity = feesRepo.findById(feesId).orElseThrow(() -> new DataNotFoundException("Fees Not found for fees Id : " + feesId));
        StudentRegistrationEntity studentRegistrationEntity = studentRegistrationRepo.findByFeesEntity(feesEntity).orElseThrow(() -> new DataNotFoundException("Student is not Found for Fees Id :" + feesEntity.getFeesId()));
        List<InstallmentEntity> installmentEntities = installmentRepo.findByFees(feesEntity).orElseThrow(() -> new DataNotFoundException("Installment is not found for fees Id :" + feesEntity.getFeesId()));
        String process = HtmlProcessor.process(feesEntity, installmentEntities, studentRegistrationEntity);

        ClassPathResource templateDir = new ClassPathResource("templates");
        String baseUri = templateDir.getURL().toExternalForm();
        try (ByteArrayOutputStream os = new ByteArrayOutputStream()) {

            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(process, baseUri);
            builder.toStream(os);
            builder.run();

            return os.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed", e);
        }

    }


}
