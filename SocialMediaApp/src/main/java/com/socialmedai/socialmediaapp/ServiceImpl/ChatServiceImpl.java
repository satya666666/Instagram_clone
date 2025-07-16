package com.socialmedai.socialmediaapp.ServiceImpl;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.Chat;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Repository.ChatRepo;
import com.socialmedai.socialmediaapp.Service.ChatService;
import com.socialmedai.socialmediaapp.SocialDto.ChatDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ChatRepo chatRepo;

    @Override
    public ChatDto createChat(UserDto user1, UserDto user2) {
        System.out.println("user1: " + user1);
        System.out.println("user2: " + user2);

        User reqUser = modelMapper.map(user1, User.class);
        User respUser = modelMapper.map(user2, User.class);

        Chat isExist = chatRepo.findChatByUsersId(reqUser, respUser);
        if (isExist != null) {
            ChatDto isExistUser = modelMapper.map(isExist, ChatDto.class);
            System.out.println("Existing chat: " + isExistUser);
            return isExistUser;
        }

        Chat chat = new Chat();
        chat.getUsers().add(reqUser);
        chat.getUsers().add(respUser);
        chat.setCreatedAt(LocalDateTime.now());

        Chat savedChat = chatRepo.save(chat);

        // Ensure messages and users are properly loaded
        savedChat.getUsers().size();
        savedChat.getMessages().size();

        ChatDto chatDto = modelMapper.map(savedChat, ChatDto.class);
        System.out.println("Created chat: " + chatDto);
        return chatDto;
    }

    @Override
    public ChatDto findChatById(int chatId) throws ResourceNotFoundException {
        Chat chat = chatRepo.findById(chatId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat not Found with ", "chat Id", chatId));

        // Ensure messages and users are properly loaded
        chat.getUsers().size();
        chat.getMessages().size();

        ChatDto chatDto = modelMapper.map(chat, ChatDto.class);
        return chatDto;
    }

    @Override
    public List<ChatDto> findUsersChat(int userId) {
        List<Chat> chats = chatRepo.findByUsersId(userId);
        return chats.stream().map(chat -> {
            chat.getUsers().size();  // Force initialization
            chat.getMessages().size();  // Force initialization
            return modelMapper.map(chat, ChatDto.class);
        }).collect(Collectors.toList());
    }
}
