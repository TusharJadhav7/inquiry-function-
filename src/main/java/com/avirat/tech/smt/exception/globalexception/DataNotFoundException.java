package com.avirat.tech.smt.exception.globalexception;


public class DataNotFoundException extends  RuntimeException {

   public DataNotFoundException(){
        super("Data not Found Exception");
    }

    public DataNotFoundException(String message){
        super(message);
    }

}
