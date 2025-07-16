package com.socialmedai.socialmediaapp.Models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Reels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ReelsId;

    private String title;
    private String video;
    private LocalDateTime createdAt;
    
    @ManyToOne
    private User user;
    
    @ManyToMany
    private Set<User> liked = new HashSet<>();
    
    @OneToMany(mappedBy = "reels", cascade = CascadeType.ALL)
    private List<ReelsComment> comments = new ArrayList<>();

    public Reels(int reelsId, String title, String video, User user, LocalDateTime createdAt) {
        ReelsId = reelsId;
        this.title = title;
        this.video = video;
        this.user = user;
        this.createdAt = createdAt;
    }

    public Reels() {
    }

    public int getReelsId() {
        return ReelsId;
    }

    public void setReelsId(int reelsId) {
        ReelsId = reelsId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
    
    public Set<User> getLiked() {
        return liked;
    }

    public void setLiked(Set<User> liked) {
        this.liked = liked;
    }
    
    public List<ReelsComment> getComments() {
        return comments;
    }

    public void setComments(List<ReelsComment> comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "Reels{" +
                "ReelsId=" + ReelsId +
                ", title='" + title + '\'' +
                ", video='" + video + '\'' +
                ", createdAt=" + createdAt +
                ", user=" + user +
                '}';
    }
}
