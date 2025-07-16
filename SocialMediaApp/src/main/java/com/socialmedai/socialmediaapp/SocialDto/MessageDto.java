package com.socialmedai.socialmediaapp.SocialDto;

import com.socialmedai.socialmediaapp.Models.Chat;
import com.socialmedai.socialmediaapp.Models.User;
import java.time.LocalDateTime;

public class MessageDto {

    private int id;
    private String content;
    private String image;

    private User user;

    private Chat chat;

    private LocalDateTime createdAt;

    public MessageDto() {
    }

    @Override
    public String toString() {
        return "MessageDto{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", image='" + image + '\'' +
                ", user=" + user +
                ", chat=" + chat +
                ", createdAt=" + createdAt +
                '}';
    }

    public MessageDto(int id, String content, String image, User user, Chat chat, LocalDateTime createdAt) {
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
