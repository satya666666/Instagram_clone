package com.socialmedai.socialmediaapp.SocialDto;

import com.socialmedai.socialmediaapp.Models.Comment;
import com.socialmedai.socialmediaapp.Models.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PostDto {

    private  int id;
    private String  caption;
    private String  image;
    private String video;
    private User user;
    private LocalDateTime createdAt;

    private List<User> liked=new ArrayList<>();
    private List<Comment> comments=new ArrayList<>();
    @Override
    public String toString() {
        return "PostDto{" +
                "id=" + id +
                ", caption='" + caption + '\'' +
                ", image='" + image + '\'' +
                ", video='" + video + '\'' +
                ", user=" + user +
                ", createdAt=" + createdAt +
                ", liked=" + liked +
                '}';
    }

    public List<User> getLiked() {
        return liked;
    }

    public void setLiked(List<User> liked) {
        this.liked = liked;
    }

    public PostDto() {
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public PostDto(int id, String caption, String image, String video, User user, LocalDateTime createdAt, List<User> liked, List<Comment> comments) {
        this.id = id;
        this.caption = caption;
        this.image = image;
        this.video = video;
        this.user = user;
        this.createdAt = createdAt;
        this.liked = liked;
        this.comments = comments;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
