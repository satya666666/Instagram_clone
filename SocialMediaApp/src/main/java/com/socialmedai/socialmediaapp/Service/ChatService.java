package com.socialmedai.socialmediaapp.Service;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.SocialDto.ChatDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ChatService {

    public ChatDto createChat(UserDto reqUser, UserDto user2);
    public ChatDto findChatById(int chatId) throws ResourceNotFoundException;


    public List<ChatDto>findUsersChat(int userId);
}
