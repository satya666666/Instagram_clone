package com.socialmedai.socialmediaapp.Repository;

import com.socialmedai.socialmediaapp.Models.Chat;
import com.socialmedai.socialmediaapp.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepo extends JpaRepository<Chat ,Integer> {

    public List<Chat>findByUsersId(int userId);
    @Query("select C from Chat C where :user member of C.users and :reqUser member  of C.users")
    public Chat findChatByUsersId(@Param("user")User user,@Param("reqUser") User reqUser);
}
