package com.avirat.tech.smt.exception.globalexception;

public class InvalidTransactionReqException extends RuntimeException{
  public   InvalidTransactionReqException(){
        super();
    }
   public InvalidTransactionReqException(String msg){
        super(msg);
    }
}
