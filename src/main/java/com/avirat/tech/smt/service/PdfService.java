package com.avirat.tech.smt.service;

import java.io.IOException;

public interface PdfService {

    public byte[] generatePdf(Integer feesId) throws IOException, InterruptedException;

}
