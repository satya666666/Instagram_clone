package com.socialmedai.socialmediaapp.Models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String chatName;
    private String ChatImage;
    @ManyToMany
    private List<User>users=new ArrayList<>();

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "chat")
    private List<Message>messages=new ArrayList<>();

    @Override
    public String toString() {
        return "Chat{" +
                "id=" + id +
                ", chatName='" + chatName + '\'' +
                ", ChatImage='" + ChatImage + '\'' +
                ", users=" + users +
                ", createdAt=" + createdAt +
                ", messages=" + messages +
                '}';
    }




    public Chat() {
    }

    public Chat(int id, String chatName, String chatImage, List<User> users, LocalDateTime createdAt, List<Message> messages) {
        this.id = id;
        this.chatName = chatName;
        ChatImage = chatImage;
        this.users = users;
        this.createdAt = createdAt;
        this.messages = messages;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getChatName() {
        return chatName;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public String getChatImage() {
        return ChatImage;
    }

    public void setChatImage(String chatImage) {
        ChatImage = chatImage;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}