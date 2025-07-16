package com.socialmedai.socialmediaapp.Controller;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Service.MessageService;
import com.socialmedai.socialmediaapp.Service.UserService;
import com.socialmedai.socialmediaapp.SocialDto.MessageDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/message")
public class MessageController {

    @Autowired
    MessageService messageService;

    @Autowired
    UserService userService;

    @PostMapping(path = "/create/{chatId}")
    public ResponseEntity<MessageDto> createMessageHandler(@RequestBody MessageDto messageDto,
                                                          @PathVariable int chatId,
                                                          @RequestHeader("Authorization")String jwt)
            throws ResourceNotFoundException {

        UserDto userDto=userService.findUserFromTwt(jwt);

        MessageDto messageDto1=messageService.createMessage(userDto,chatId,messageDto);
        return ResponseEntity.ok(messageDto1);
    }

    @GetMapping(path = "/find/{chatId}")

  public ResponseEntity<List<MessageDto>>getMessageHandler(@PathVariable int chatId){
        List<MessageDto>messageDtos=messageService.findChatsMessage(chatId);
        return ResponseEntity.ok(messageDtos);
    }



}
