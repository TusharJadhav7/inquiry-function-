package com.avirat.tech.smt.pdfgenerator;

import com.avirat.tech.smt.entity.FeesEntity;
import com.avirat.tech.smt.entity.InstallmentEntity;
import com.avirat.tech.smt.entity.StudentRegistrationEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;


public class HtmlProcessor {


    public static String process(FeesEntity feesEntity , List<InstallmentEntity> installmentEntityList, StudentRegistrationEntity studentRegistrationEntity) throws IOException {

        String html = loadHtml();
        // Build items rows
        StringBuilder installmentDetails = new StringBuilder();
        int count=1;
        for ( InstallmentEntity installmentEntity:installmentEntityList) {
            installmentDetails.append("<tr>")
                    .append("<td>").append(count).append("</td>")
                    .append("<td>").append(installmentEntity.getInstallNumber()).append("</td>")
                    .append("<td>").append(installmentEntity.getIntlmtTotalFees()).append("</td>")
                    .append("<td>").append(installmentEntity.getIntlmtPaidFees()).append("</td>")
                    .append("<td>").append(installmentEntity.getIntlmtPending()).append("</td>")
                    .append("</tr>");
            count++;
        }

        // Replace placeholders
        html = html.replace("{{receiptNo}}","1");
        html = html.replace("{{studentName}}", studentRegistrationEntity.getFirstName().concat(" ").concat(studentRegistrationEntity.getMiddleName()).concat(" ").concat(studentRegistrationEntity.getLastName()));
        html = html.replace("{{date}}", LocalDate.now().toString());
        html = html.replace("{{std}}", studentRegistrationEntity.getStandard());
        html = html.replace("{{courseName}}", studentRegistrationEntity.getCourse());
        html = html.replace("{{contactNo}}", studentRegistrationEntity.getStdMobNumber());
        html = html.replace("{{rows}}", installmentDetails);
        html = html.replace("{{totalFees}}", feesEntity.getTotalFees().toString());
        html = html.replace("{{paidFees}}", feesEntity.getPaidFees().toString());
        html = html.replace("{{pendingFees}}", feesEntity.getPending().toString());
        String logoPath = new ClassPathResource("static/logo.png")
                .getURL()
                .toString();

        html = html.replace("{{logo}}", logoPath);

        return html;
    }

    private static String loadHtml() {
        try {
            ClassPathResource resource = new ClassPathResource("templates/Receipt.html");
            byte[] bytes = resource.getInputStream().readAllBytes();
            return new String(bytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Failed to load HTML file", e);
        }
    }
}
