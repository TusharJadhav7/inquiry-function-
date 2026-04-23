package com.avirat.tech.smt.constant;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class InstallmentRatio {

    private  Map<Integer, List<Long>> installmentRatioMap;
    private static InstallmentRatio installmentRatio;
    private  InstallmentRatio()
    {
        this.installmentRatioMap=new LinkedHashMap<>();
        this.installmentRatioMap.put(1,List.of(100L));
        this.installmentRatioMap.put(2,List.of(50L,50L));
        this.installmentRatioMap.put(3,List.of(50L,25L,25L));
        this.installmentRatioMap.put(4,List.of(40L,25L,25L,10L));
    }

    public static InstallmentRatio getInstallmentRatio()
    {
        if (installmentRatio==null)
            installmentRatio=new InstallmentRatio();
        return installmentRatio;
    }

    public Map<Integer,List<Long>> getInstallRatioMap(){
        if (installmentRatio==null)
            throw new RuntimeException("Installment Ratio is not available");
        return installmentRatioMap;
    }


}
