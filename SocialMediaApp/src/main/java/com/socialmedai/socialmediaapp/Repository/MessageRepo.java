package com.socialmedai.socialmediaapp.Repository;

import com.socialmedai.socialmediaapp.Models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message,Integer> {

    public List<Message>findByChatId(int chatId);
}
