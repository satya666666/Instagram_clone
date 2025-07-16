package com.socialmedai.socialmediaapp.SocialDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ReelsDto {
    private int reelsId;
    private String Video;
    private String title;
    private UserDto user;
    private LocalDateTime createdAt;
    private List<ReelsCommentDto> comments = new ArrayList<>();
    private Set<Integer> likedByUsers = new HashSet<>();
    private boolean isLiked;
    private boolean isSaved;

    @Override
    public String toString() {
        return "ReelsDto{" +
                "reelsId=" + reelsId +
                ", Video='" + Video + '\'' +
                ", title='" + title + '\'' +
                ", user=" + user +
                ", createdAt=" + createdAt +
                ", comments=" + comments +
                ", likedByUsers=" + likedByUsers +
                ", isLiked=" + isLiked +
                ", isSaved=" + isSaved +
                '}';
    }

    public ReelsDto() {
    }

    public ReelsDto(int reelsId, String video, String title, UserDto user, LocalDateTime createdAt, 
                   List<ReelsCommentDto> comments, Set<Integer> likedByUsers, boolean isLiked, boolean isSaved) {
        this.reelsId = reelsId;
        Video = video;
        this.title = title;
        this.user = user;
        this.createdAt = createdAt;
        this.comments = comments;
        this.likedByUsers = likedByUsers;
        this.isLiked = isLiked;
        this.isSaved = isSaved;
    }

    public int getReelsId() {
        return reelsId;
    }

    public void setReelsId(int reelsId) {
        this.reelsId = reelsId;
    }

    public String getVideo() {
        return Video;
    }

    public void setVideo(String video) {
        Video = video;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public List<ReelsCommentDto> getComments() {
        return comments;
    }

    public void setComments(List<ReelsCommentDto> comments) {
        this.comments = comments;
    }

    public Set<Integer> getLikedByUsers() {
        return likedByUsers;
    }

    public void setLikedByUsers(Set<Integer> likedByUsers) {
        this.likedByUsers = likedByUsers;
    }

    public boolean isLiked() {
        return isLiked;
    }

    public void setLiked(boolean liked) {
        isLiked = liked;
    }

    public boolean isSaved() {
        return isSaved;
    }

    public void setSaved(boolean saved) {
        isSaved = saved;
    }
}
