package com.socialmedai.socialmediaapp.Models;

import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity

public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storyId;
    private String image;
    private String caption;
    @ManyToOne
    private User user;
private LocalDateTime createdAt;
    @Override
    public String toString() {
        return "Story{" +
                "storyId=" + storyId +
                ", image='" + image + '\'' +
                ", caption='" + caption + '\'' +
                ", user=" + user +
                '}';
    }

    public Story() {
    }

    public Story(int sotryId, String caption, String image, User user, LocalDateTime createdAt) {
        this.storyId = sotryId;
        this.caption = caption;
        this.image = image;
        this.user = user;
        this.createdAt = createdAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getStoryId() {
        return storyId;
    }

    public void setStoryId(int storyId) {
        this.storyId = storyId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
