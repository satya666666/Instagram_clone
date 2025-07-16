package com.socialmedai.socialmediaapp.ApiResponse;

public class LoginResponse {

    private  String emal;
   private String password;

    public LoginResponse() {
    }

    public LoginResponse(String emal, String password) {
        this.emal = emal;
        this.password = password;
    }

    public String getEmal() {
        return emal;
    }

    public void setEmal(String emal) {
        this.emal = emal;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
