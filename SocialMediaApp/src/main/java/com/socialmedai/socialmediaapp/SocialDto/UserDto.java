package com.socialmedai.socialmediaapp.SocialDto;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
public  class UserDto{


    private  int id;

    private String firstName;
    private String lastName;
    private  String email;
    private  String password;
    private  String gender;
    @ElementCollection
    private Set<Integer> followers = new HashSet<>();
    @ElementCollection
    private Set<Integer> followings = new HashSet<>();
    @ElementCollection
    private Set<Integer> pendingFollowRequests = new HashSet<>();
    @ElementCollection
    private Set<Integer> sentFollowRequests = new HashSet<>();

    public UserDto(int id, String firstName, String lastName, String email, String password, String gender, Set<Integer> followers, Set<Integer> followings, Set<Integer> pendingFollowRequests, Set<Integer> sentFollowRequests) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.followers = followers;
        this.followings = followings;
        this.pendingFollowRequests = pendingFollowRequests;
        this.sentFollowRequests = sentFollowRequests;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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

    public UserDto() {
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

    @Override
    public String toString() {
        return "User{" +
                "id"+id+" ,"+
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
