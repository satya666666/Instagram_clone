package com.socialmedai.socialmediaapp.Models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ReelsComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String content;
    private LocalDateTime createdAt;

    @ManyToOne
    private User user;

    @ManyToOne
    private Reels reels;

    public ReelsComment() {
    }

    public ReelsComment(int id, String content, LocalDateTime createdAt, User user, Reels reels) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.user = user;
        this.reels = reels;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Reels getReels() {
        return reels;
    }

    public void setReels(Reels reels) {
        this.reels = reels;
    }

    @Override
    public String toString() {
        return "ReelsComment{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", createdAt=" + createdAt +
                ", user=" + user.getId() +
                ", reels=" + reels.getReelsId() +
                '}';
    }
}
