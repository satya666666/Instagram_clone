package com.socialmedai.socialmediaapp.Repository;

import com.socialmedai.socialmediaapp.Models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post,Integer> {

    @Query("select p from Post p where p.user.id=:userId")
    List<Post>findPostByUserId(int userId);
}
