package com.socialmedai.socialmediaapp.Request;

import com.socialmedai.socialmediaapp.Models.User;

public class ChatRequest {
private int userId;

    public ChatRequest(int userId) {
        this.userId = userId;
    }

    public ChatRequest() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
