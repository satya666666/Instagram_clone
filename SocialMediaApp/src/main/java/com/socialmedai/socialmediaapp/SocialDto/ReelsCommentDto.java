package com.socialmedai.socialmediaapp.SocialDto;

import java.time.LocalDateTime;

public class ReelsCommentDto {
    private int id;
    private String content;
    private LocalDateTime createdAt;
    private UserDto user;
    private int reelsId;

    public ReelsCommentDto() {
    }

    public ReelsCommentDto(int id, String content, LocalDateTime createdAt, UserDto user, int reelsId) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.user = user;
        this.reelsId = reelsId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public int getReelsId() {
        return reelsId;
    }

    public void setReelsId(int reelsId) {
        this.reelsId = reelsId;
    }

    @Override
    public String toString() {
        return "ReelsCommentDto{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", createdAt=" + createdAt +
                ", user=" + user +
                ", reelsId=" + reelsId +
                '}';
    }
}
