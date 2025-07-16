package com.socialmedai.socialmediaapp.Controller;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Repository.UserRepo;
import com.socialmedai.socialmediaapp.Request.ChatRequest;
import com.socialmedai.socialmediaapp.Service.ChatService;
import com.socialmedai.socialmediaapp.Service.UserService;
import com.socialmedai.socialmediaapp.SocialDto.ChatDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;
    @Autowired
     private ModelMapper modelMapper;
    @Autowired
    private UserRepo userRepo;
    @PostMapping(path = "/create")
    public ResponseEntity<ChatDto> createChat(@RequestBody ChatRequest request,
                                              @RequestHeader ("Authorization")String jwt) throws ResourceNotFoundException {

        UserDto reqUser=userService.findUserFromTwt(jwt); //sender

        User user2 = userRepo.findById(request.getUserId()).orElseThrow(() ->
                new ResourceNotFoundException("user not Found ", "with userId", request.getUserId()));//accepter

     UserDto userDto=modelMapper.map(user2,UserDto.class);

        ChatDto chatDto=chatService.createChat(reqUser,userDto);
        return ResponseEntity.ok(chatDto);
    }

    @GetMapping(path = "/users/chats")

    public ResponseEntity<List<ChatDto>>findChatByUserId(@RequestHeader ("Authorization")String jwt){
        UserDto user=userService.findUserFromTwt(jwt);
        List<ChatDto>chats=chatService.findUsersChat(user.getId());
        return ResponseEntity.ok(chats);

    }


    @GetMapping(path = "/byId/{id}")

    public ResponseEntity<ChatDto> findChatById(@PathVariable int id) throws ResourceNotFoundException {
        ChatDto chatDto=chatService.findChatById(id);
        return ResponseEntity.ok(chatDto);
    }
}
