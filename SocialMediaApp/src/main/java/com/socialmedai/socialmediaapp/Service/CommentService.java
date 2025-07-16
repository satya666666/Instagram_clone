package com.socialmedai.socialmediaapp.Service;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.Comment;
import com.socialmedai.socialmediaapp.SocialDto.CommentDto;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {
    public CommentDto createComment(CommentDto commentDto, int postId, int userId) throws ResourceNotFoundException;

    public CommentDto findCommentById(int commentId) throws ResourceNotFoundException;

    public CommentDto likeComment(int commentId, int userId) throws ResourceNotFoundException;


}
