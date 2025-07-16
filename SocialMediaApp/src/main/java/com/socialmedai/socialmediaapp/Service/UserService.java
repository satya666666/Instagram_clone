package com.socialmedai.socialmediaapp.Service;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface UserService {
    public UserDto registerUser(UserDto userDto);

    public UserDto findUserById(int userId) throws ResourceNotFoundException;

    public UserDto findUserByEmail(String email);

    public UserDto followUser(int userId1, int userId2) throws ResourceNotFoundException;
    
    public UserDto unfollowUser(int userId1, int userId2) throws ResourceNotFoundException;
    
    public UserDto sendFollowRequest(int requesterId, int receiverId) throws ResourceNotFoundException;
    
    public UserDto acceptFollowRequest(int receiverId, int requesterId) throws ResourceNotFoundException;
    
    public UserDto rejectFollowRequest(int receiverId, int requesterId) throws ResourceNotFoundException;
    
    public List<UserDto> getPendingFollowRequests(int userId) throws ResourceNotFoundException;

    public UserDto UpdateUser(int userId,UserDto userDto) throws ResourceNotFoundException;

   public List<User> searchUser(String Query);
   public List<UserDto> searchUsers(String query);
public List<UserDto>getAllUser();
public  UserDto findUserFromTwt(String jwt);
}
