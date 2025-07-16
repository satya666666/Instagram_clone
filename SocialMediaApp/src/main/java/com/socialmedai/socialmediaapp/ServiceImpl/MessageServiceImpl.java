package com.socialmedai.socialmediaapp.ServiceImpl;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.Chat;
import com.socialmedai.socialmediaapp.Models.Message;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Repository.ChatRepo;
import com.socialmedai.socialmediaapp.Repository.MessageRepo;
import com.socialmedai.socialmediaapp.Repository.UserRepo;
import com.socialmedai.socialmediaapp.Service.MessageService;
import com.socialmedai.socialmediaapp.SocialDto.MessageDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private ChatRepo chatRepo;

    @Autowired
    private UserRepo userRepo;  // Added UserRepo to fetch User from DB

    @Override
    public MessageDto createMessage(UserDto userDto, int chatId, MessageDto messageDto)
            throws ResourceNotFoundException {

        Chat chat = chatRepo.findById(chatId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat not found", "chat id", chatId));

        // Fetch the user from the database to ensure userId is stored
        User user = userRepo.findById(userDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "user id", userDto.getId()));

        Message message = modelMapper.map(messageDto, Message.class);
        message.setChat(chat);
        message.setCreatedAt(LocalDateTime.now());
        message.setUser(user);  // Ensure user is set from DB

        Message savedMessage = messageRepo.save(message);

        chat.getMessages().add(savedMessage);
        chatRepo.save(chat);

        return modelMapper.map(savedMessage, MessageDto.class);
    }

    @Override
    public List<MessageDto> findChatsMessage(int chatId) {
        List<Message> messages = messageRepo.findByChatId(chatId);
        return messages.stream()
                .map(message -> modelMapper.map(message, MessageDto.class))
                .collect(Collectors.toList());
    }
}
