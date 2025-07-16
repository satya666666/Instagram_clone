package com.socialmedai.socialmediaapp.SocialDto;

import java.time.LocalDateTime;
import java.util.Date;

public class StoryDto {

    private int storyId;
    private String caption;
    private String image;
    private UserDto user;
private LocalDateTime createdAt;

    public StoryDto(int id, String caption, String image, UserDto user, LocalDateTime createdAt) {
        this.storyId = id;
        this.caption = caption;
        this.image = image;
        this.user = user;
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "StoryDto{" +
                "id=" + storyId +
                ", caption='" + caption + '\'' +
                ", image='" + image + '\'' +
                ", user=" + user +
                ", createdAt=" + createdAt +
                '}';
    }

    public StoryDto() {
    }

    public int getId() {
        return storyId;
    }

    public void setId(int id) {
        this.storyId = id;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
