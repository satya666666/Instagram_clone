package com.socialmedai.socialmediaapp.Controller;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Service.UserService;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping(path = "/allUser")
    public List<UserDto>getAllUser(){
        List<UserDto>userDtos=userService.getAllUser();
        return userDtos;
    }

    @GetMapping(path = "/user/{userId}")
    public UserDto getUserById(@PathVariable int userId) throws ResourceNotFoundException {
        return userService.findUserById(userId);
    }

    @PutMapping(path = "/api/update")
    public UserDto updateUser(@RequestHeader ("Authorization")String jwt, @RequestBody UserDto userDto) throws ResourceNotFoundException {
        UserDto reqUser=userService.findUserFromTwt(jwt);
        return userService.UpdateUser(reqUser.getId(), userDto);
    }

    @PutMapping(path = "/follow/{userId2}")
    public UserDto UserFollowhandler(@RequestHeader("Authorization")String jwt, @PathVariable int userId2) throws ResourceNotFoundException {
       UserDto reqUser=userService.findUserFromTwt(jwt);
       UserDto userDto=userService.followUser(reqUser.getId(),userId2);
       return userDto;
    }
    
    @PutMapping(path = "/unfollow/{userId2}")
    public UserDto userUnfollowHandler(@RequestHeader("Authorization")String jwt, @PathVariable int userId2) throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        UserDto userDto = userService.unfollowUser(reqUser.getId(), userId2);
        return userDto;
    }
    
    @PostMapping(path = "/send-follow-request/{receiverId}")
    public ResponseEntity<UserDto> sendFollowRequestHandler(@RequestHeader("Authorization")String jwt, @PathVariable int receiverId) throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        UserDto userDto = userService.sendFollowRequest(reqUser.getId(), receiverId);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }
    
    @PutMapping(path = "/accept-follow-request/{requesterId}")
    public ResponseEntity<UserDto> acceptFollowRequestHandler(@RequestHeader("Authorization")String jwt, @PathVariable int requesterId) throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        UserDto userDto = userService.acceptFollowRequest(reqUser.getId(), requesterId);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }
    
    @PutMapping(path = "/reject-follow-request/{requesterId}")
    public ResponseEntity<UserDto> rejectFollowRequestHandler(@RequestHeader("Authorization")String jwt, @PathVariable int requesterId) throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        UserDto userDto = userService.rejectFollowRequest(reqUser.getId(), requesterId);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }
    
    @GetMapping(path = "/pending-follow-requests")
    public ResponseEntity<List<UserDto>> getPendingFollowRequestsHandler(@RequestHeader("Authorization")String jwt) throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        List<UserDto> pendingRequests = userService.getPendingFollowRequests(reqUser.getId());
        return new ResponseEntity<>(pendingRequests, HttpStatus.OK);
    }
//    @DeleteMapping(path = "/delete/{userId}")
//    public String deleteUser(@PathVariable int userId) throws ResourceNotFoundException {
//        userService.deleteUser(userId);
//        return "User deleted successfully.";
//    }


    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUsers(@RequestParam("query") String query) {
        List<UserDto> users = userService.searchUsers(query);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(path = "/api/search-user")
    public List<User> searchUser(@RequestParam("query") String query,@RequestHeader ("Authorization")String jwt) {
        UserDto userDto=userService.findUserFromTwt(jwt);
        if(userDto==null) new BadCredentialsException("you are not logged in"+userDto.getEmail());
        return userService.searchUser(query);
    }

    @GetMapping(path = "/api/users/profile")
    public UserDto getUserFromToken(@RequestHeader("Authorization")String jwt){

        UserDto userDto=userService.findUserFromTwt(jwt);
        userDto.setPassword(null);
        return userDto;
    }


}
