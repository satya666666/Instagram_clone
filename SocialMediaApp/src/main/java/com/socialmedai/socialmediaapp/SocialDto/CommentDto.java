package com.socialmedai.socialmediaapp.SocialDto;

import com.socialmedai.socialmediaapp.Models.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class CommentDto {
    private int id;
    private String content;
    private User user;
    private List<User> liked = new ArrayList<>();
    private LocalDateTime createdAt;
    public CommentDto(int id, String content, User user, List<User> liked, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.liked = liked;
        this.createdAt = createdAt;
    }

    public CommentDto() {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<User> getLiked() {
        return liked;
    }

    public void setLiked(List<User> liked) {
        this.liked = liked;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", user=" + user +
                ", liked=" + liked +
                ", createdAt=" + createdAt +
                '}';
    }
}


