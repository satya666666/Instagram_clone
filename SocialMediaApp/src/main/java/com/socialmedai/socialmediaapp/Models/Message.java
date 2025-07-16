package com.socialmedai.socialmediaapp.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity

public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String content;
    private String image;
    @ManyToOne
    private User user;
    @JsonIgnore
    @ManyToOne
    private Chat chat;

    private LocalDateTime createdAt;

    public Message() {
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", image='" + image + '\'' +
                ", user=" + user +
                ", chat=" + chat +
                ", createdAt=" + createdAt +
                '}';
    }

    public Message(int id, String content, String image, User user, Chat chat, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.image = image;
        this.user = user;
        this.chat = chat;
        this.createdAt = createdAt;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
