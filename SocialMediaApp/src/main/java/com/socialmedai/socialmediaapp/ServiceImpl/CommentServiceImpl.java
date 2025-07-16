package com.socialmedai.socialmediaapp.ServiceImpl;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.Comment;
import com.socialmedai.socialmediaapp.Models.Post;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Repository.CommentRepo;
import com.socialmedai.socialmediaapp.Repository.PostRepo;
import com.socialmedai.socialmediaapp.Repository.UserRepo;
import com.socialmedai.socialmediaapp.Service.CommentService;
import com.socialmedai.socialmediaapp.Service.PostService;
import com.socialmedai.socialmediaapp.Service.UserService;
import com.socialmedai.socialmediaapp.SocialDto.CommentDto;
import com.socialmedai.socialmediaapp.SocialDto.PostDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;

import static com.fasterxml.jackson.databind.type.LogicalType.DateTime;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
     private  CommentRepo commentRepo;

    @Autowired
    private  PostRepo postRepo;

    @Autowired
     private  ModelMapper modelMapper;
    @Override
    public CommentDto createComment(CommentDto commentDto, int postId, int userId) throws ResourceNotFoundException {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", userId));
        Post post = postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with postId", postId));


        Comment savedcomment=modelMapper.map(commentDto,Comment.class);
        savedcomment.setUser(user);
        savedcomment.setCreatedAt(LocalDateTime.now());

        commentRepo.save(savedcomment); // save comment to the database

         post.getComments().add(savedcomment); // add comment to the post

         postRepo.save(post); // save post to the database

        CommentDto commentDto1=modelMapper.map(savedcomment,CommentDto.class);

        return commentDto1;
    }

    @Override
    public CommentDto findCommentById(int commentId) throws ResourceNotFoundException {
        Comment comment=commentRepo.findById(commentId).orElseThrow(()->new ResourceNotFoundException("Comment not found ","with commentId",commentId));
        CommentDto commentDto=modelMapper.map(comment,CommentDto.class);
        return commentDto;
    }

    @Override
    public CommentDto likeComment(int commentId, int userId) throws ResourceNotFoundException {
        Comment comment=commentRepo.findById(commentId).orElseThrow(()->new ResourceNotFoundException("Comment not found ","with commentId",commentId));
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", userId));

        if(!comment.getLiked().contains(user))
            comment.getLiked().add(user);
        else comment.getLiked().remove(user);

        commentRepo.save(comment);
        CommentDto commentDto=modelMapper.map(comment,CommentDto.class);
        return commentDto;
    }
}
