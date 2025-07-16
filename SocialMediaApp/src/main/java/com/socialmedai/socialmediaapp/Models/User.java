package com.socialmedai.socialmediaapp.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
//    @NotEmpty(message = "can't null")
    private String firstName;
//    @NotEmpty(message = "can't null")
    private String lastName;
//    @NotNull
    private String email;
//    @NotEmpty
    private String password;
//    @NotEmpty
    private String gender;
    @JsonIgnore
    @ManyToMany   // many user can save many post
    private List<Post> savedpost = new ArrayList<>();
    
    @JsonIgnore
    @ManyToMany   // many users can save many reels
    private Set<Reels> savedReels = new HashSet<>();

    @ElementCollection
    private Set<Integer> followers = new HashSet<>();

    @ElementCollection
    private Set<Integer> followings = new HashSet<>();
    
    @ElementCollection
    private Set<Integer> pendingFollowRequests = new HashSet<>();
    
    @ElementCollection
    private Set<Integer> sentFollowRequests = new HashSet<>();

    public User(int id, String firstName, String lastName, String email, String password, String gender, 
               List<Post> savedpost, Set<Reels> savedReels, Set<Integer> followers, Set<Integer> followings, 
               Set<Integer> pendingFollowRequests, Set<Integer> sentFollowRequests) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.savedpost = savedpost;
        this.savedReels = savedReels;
        this.followers = followers;
        this.followings = followings;
        this.pendingFollowRequests = pendingFollowRequests;
        this.sentFollowRequests = sentFollowRequests;
    }

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public List<Post> getSavedpost() {
        return savedpost;
    }

    public void setSavedpost(List<Post> savedpost) {
        this.savedpost = savedpost;
    }
    
    public Set<Reels> getSavedReels() {
        return savedReels;
    }

    public void setSavedReels(Set<Reels> savedReels) {
        this.savedReels = savedReels;
    }

    public Set<Integer> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<Integer> followers) {
        this.followers = followers;
    }

    public Set<Integer> getFollowings() {
        return followings;
    }

    public void setFollowings(Set<Integer> followings) {
        this.followings = followings;
    }
    
    public Set<Integer> getPendingFollowRequests() {
        return pendingFollowRequests;
    }

    public void setPendingFollowRequests(Set<Integer> pendingFollowRequests) {
        this.pendingFollowRequests = pendingFollowRequests;
    }

    public Set<Integer> getSentFollowRequests() {
        return sentFollowRequests;
    }

    public void setSentFollowRequests(Set<Integer> sentFollowRequests) {
        this.sentFollowRequests = sentFollowRequests;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", gender='" + gender + '\'' +
                ", savedpost=" + savedpost +
                ", savedReels=" + savedReels +
                ", followers=" + followers +
                ", followings=" + followings +
                ", pendingFollowRequests=" + pendingFollowRequests +
                ", sentFollowRequests=" + sentFollowRequests +
                '}';
    }
}
