package com.socialmedai.socialmediaapp.Service;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.Message;
import com.socialmedai.socialmediaapp.SocialDto.ChatDto;
import com.socialmedai.socialmediaapp.SocialDto.MessageDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MessageService {

    public MessageDto createMessage(UserDto userDto, int chatId, MessageDto messageDto) throws ResourceNotFoundException;

    public List<MessageDto>findChatsMessage(int chatId);
}
