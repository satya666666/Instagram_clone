package com.socialmedai.socialmediaapp.Service;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.SocialDto.PostDto;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface PostService {

    PostDto createNewpost(PostDto postDto, int userId) throws ResourceNotFoundException;

    String deletePost(int postId, int userId) throws Exception;

    List<PostDto> findPostByUserId(int userId) throws ResourceNotFoundException;

    PostDto findPostById(int postId) throws ResourceNotFoundException;

    List<PostDto> findAllpost() ;

    PostDto savedPost(int postId, int UserId) throws ResourceNotFoundException;

    PostDto likePost(int postId, int userId) throws ResourceNotFoundException;
    
    List<PostDto> getSavedPosts(int userId) throws ResourceNotFoundException;

}
