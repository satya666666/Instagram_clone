package com.socialmedai.socialmediaapp.ExceptionHandler;

public class ResourceNotFoundException  extends Exception{
     private  String Message;
     private  String value;
     private  int id;

    public ResourceNotFoundException(String message, String value, int id) {
        super(String.format("%s %s: %s", message, value, id));
        this.Message = message;
        this.value = value;
        this.id = id;
    }





}
