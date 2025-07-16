package com.socialmedai.socialmediaapp.SocialDto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatDto {

    private int id;
    private String imageName;
    private String chatImage;
    private LocalDateTime createdAt;
    private List<UserDto> users = new ArrayList<>();
    private List<MessageDto> messages = new ArrayList<>();

    public ChatDto(int id, String imageName, String chatImage, LocalDateTime createdAt, List<UserDto> users, List<MessageDto> messages) {
        this.id = id;
        this.imageName = imageName;
        this.chatImage = chatImage;
        this.createdAt = createdAt;
        this.users = users;
        this.messages = messages;
    }

    public ChatDto() {
    }

    @Override
    public String toString() {
        return "ChatDto{" +
                "id=" + id +
                ", imageName='" + imageName + '\'' +
                ", chatImage='" + chatImage + '\'' +
                ", createdAt=" + createdAt +
                ", users=" + users +
                ", messages=" + messages +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getChatImage() {
        return chatImage;
    }

    public void setChatImage(String chatImage) {
        this.chatImage = chatImage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<UserDto> getUsers() {
        return users;
    }

    public void setUsers(List<UserDto> users) {
        this.users = users;
    }

    public List<MessageDto> getMessages() {
        return messages;
    }

    public void setMessages(List<MessageDto> messages) {
        this.messages = messages;
    }
}
