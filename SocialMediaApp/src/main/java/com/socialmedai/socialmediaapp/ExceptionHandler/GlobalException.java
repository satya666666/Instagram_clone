package com.socialmedai.socialmediaapp.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.View;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalException {

    private final View error;

    public GlobalException(View error) {
        this.error = error;
    }
   @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> otherExceptoinHandler(Exception ue, WebRequest req){
        ErrorDetails errorDetails=new ErrorDetails(ue.getMessage(),req.getDescription(false), LocalDateTime.now());
    return  new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
}
