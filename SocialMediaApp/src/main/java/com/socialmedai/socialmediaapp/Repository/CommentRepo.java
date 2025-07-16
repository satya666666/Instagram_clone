package com.socialmedai.socialmediaapp.Repository;

import com.socialmedai.socialmediaapp.Models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Integer> {
}
