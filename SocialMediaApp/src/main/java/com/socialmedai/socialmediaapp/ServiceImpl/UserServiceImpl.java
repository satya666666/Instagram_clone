package com.socialmedai.socialmediaapp.ServiceImpl;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Repository.UserRepo;
import com.socialmedai.socialmediaapp.Service.UserService;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import com.socialmedai.socialmediaapp.config.JwtProvider;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    ModelMapper modelMapper;


    @Override
    public UserDto registerUser(UserDto userDto) {
        User user=modelMapper.map(userDto ,User.class);
        userRepo.save(user);
       UserDto SaveduserDto1=modelMapper.map(user ,UserDto.class);

        return SaveduserDto1;
    }

    @Override
    public UserDto findUserById(int userId) throws ResourceNotFoundException {
        User user=userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",userId));
        UserDto userDto=modelMapper.map(user,UserDto.class);
        return userDto;
    }

    @Override
    public UserDto findUserByEmail(String email) {
        return null;
    }

    @Override
    public UserDto followUser(int reqUser, int respUser) throws ResourceNotFoundException {
        User reqFollowUser=userRepo.findById(reqUser).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",reqUser));
        User respFollowingUser=userRepo.findById(respUser).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",respUser));


        respFollowingUser.getFollowers().add(reqFollowUser.getId());
        reqFollowUser.getFollowings().add(respFollowingUser.getId());

        userRepo.save(reqFollowUser);
        userRepo.save(respFollowingUser);

         UserDto userDto=modelMapper.map(reqFollowUser,UserDto.class);
        return userDto;
    }
    
    @Override
    public UserDto unfollowUser(int reqUser, int respUser) throws ResourceNotFoundException {
        User reqFollowUser = userRepo.findById(reqUser).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",reqUser));
        User respFollowingUser = userRepo.findById(respUser).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",respUser));
        
        respFollowingUser.getFollowers().remove(reqFollowUser.getId());
        reqFollowUser.getFollowings().remove(respFollowingUser.getId());
        
        userRepo.save(reqFollowUser);
        userRepo.save(respFollowingUser);
        
        UserDto userDto = modelMapper.map(reqFollowUser, UserDto.class);
        return userDto;
    }
    
    @Override
    public UserDto sendFollowRequest(int requesterId, int receiverId) throws ResourceNotFoundException {
        User requester = userRepo.findById(requesterId).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",requesterId));
        User receiver = userRepo.findById(receiverId).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",receiverId));
        
        // Add to pending requests for receiver
        receiver.getPendingFollowRequests().add(requester.getId());
        // Add to sent requests for requester
        requester.getSentFollowRequests().add(receiver.getId());
        
        userRepo.save(requester);
        userRepo.save(receiver);
        
        UserDto userDto = modelMapper.map(requester, UserDto.class);
        return userDto;
    }
    
    @Override
    public UserDto acceptFollowRequest(int receiverId, int requesterId) throws ResourceNotFoundException {
        User receiver = userRepo.findById(receiverId).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",receiverId));
        User requester = userRepo.findById(requesterId).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",requesterId));
        
        // Remove from pending requests
        receiver.getPendingFollowRequests().remove(requester.getId());
        // Remove from sent requests
        requester.getSentFollowRequests().remove(receiver.getId());
        
        // Add to followers/followings
        receiver.getFollowers().add(requester.getId());
        requester.getFollowings().add(receiver.getId());
        
        userRepo.save(receiver);
        userRepo.save(requester);
        
        UserDto userDto = modelMapper.map(receiver, UserDto.class);
        return userDto;
    }
    
    @Override
    public UserDto rejectFollowRequest(int receiverId, int requesterId) throws ResourceNotFoundException {
        User receiver = userRepo.findById(receiverId).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",receiverId));
        User requester = userRepo.findById(requesterId).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",requesterId));
        
        // Remove from pending requests
        receiver.getPendingFollowRequests().remove(requester.getId());
        // Remove from sent requests
        requester.getSentFollowRequests().remove(receiver.getId());
        
        userRepo.save(receiver);
        userRepo.save(requester);
        
        UserDto userDto = modelMapper.map(receiver, UserDto.class);
        return userDto;
    }
    
    @Override
    public List<UserDto> getPendingFollowRequests(int userId) throws ResourceNotFoundException {
        User user = userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",userId));
        
        List<UserDto> pendingRequests = new ArrayList<>();
        for (Integer requesterId : user.getPendingFollowRequests()) {
            User requester = userRepo.findById(requesterId).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",requesterId));
            pendingRequests.add(modelMapper.map(requester, UserDto.class));
        }
        
        return pendingRequests;
    }

    @Override
    public UserDto UpdateUser(int userId, UserDto userDto) throws ResourceNotFoundException {
        User user=userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User Not Found","With UserId",userId));
        user.setEmail(userDto.getEmail());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setFollowers(userDto.getFollowers());
        user.setFollowings(userDto.getFollowings());
        user.setPassword(userDto.getPassword());
        user.setGender(userDto.getGender());
        userRepo.save(user);
        UserDto userDto1=modelMapper.map(user,UserDto.class);
        return userDto1;
    }

    @Override
    public List<User> searchUser(String Query) {
        return userRepo.SearchUser(Query);
    }

    @Override
    public List<UserDto> searchUsers(String query) {
        // Find users whose first name, last name, or email contains the query string
        List<User> users = userRepo.SearchUser(query);
        
        // Convert User entities to UserDto objects
        return users.stream()
            .map(user -> modelMapper.map(user, UserDto.class))
            .collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getAllUser() {
        List<User>user=userRepo.findAll();
        List<UserDto>userDtos= user.stream().map((usersin)->modelMapper.map(usersin,UserDto.class)).collect(Collectors.toList());

        return userDtos;
    }

    @Override
    public UserDto findUserFromTwt(String jwt) {
        String email= JwtProvider.getEmailFromJwtToken(jwt);
        User  user=userRepo.findByEmail(email);
        UserDto userDto=modelMapper.map(user ,UserDto.class);
        return userDto;
    }


}
