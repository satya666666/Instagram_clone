package com.socialmedai.socialmediaapp.ServiceImpl;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.Post;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Repository.PostRepo;
import com.socialmedai.socialmediaapp.Repository.UserRepo;
import com.socialmedai.socialmediaapp.Service.PostService;
import com.socialmedai.socialmediaapp.SocialDto.PostDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    PostRepo postRepo;

    @Autowired
    UserRepo userRepo;


    @Override
    public PostDto createNewpost(PostDto postDto, int userId) throws ResourceNotFoundException {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", userId));
        Post post = modelMapper.map(postDto, Post.class);
        post.setCaption(postDto.getCaption());
        post.setCreatedAt(LocalDateTime.now());
        post.setUser(user);
        post.setImage(postDto.getImage());
        post.setVideo(postDto.getVideo());
        postRepo.save(post);
        PostDto savedPost = modelMapper.map(post, PostDto.class);

        return savedPost;
    }

    @Override
    public String deletePost(int postId, int userId) throws Exception {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", userId));
        Post post = postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with postId", postId));

        if (post.getUser().getId() == user.getId()) {
            postRepo.delete(post);
        } else {
            throw new Exception("you can't delete another post");
        }

        return "your post is deleted succsfully";
    }


    @Override
    public List<PostDto> findPostByUserId(int userId) throws ResourceNotFoundException {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", userId));
        List<Post> post = postRepo.findPostByUserId(userId);
        List<PostDto>AllPost=post.stream().map((postData)->modelMapper.map(postData,PostDto.class)).toList();


        return AllPost;

    }

    @Override
    public PostDto findPostById(int postId) throws ResourceNotFoundException {

        Post post = postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", postId));

        PostDto postDto = modelMapper.map(post, PostDto.class);


        return postDto;
    }

    @Override
    public List<PostDto> findAllpost()  {

        List<Post> post = postRepo.findAll();
        List<PostDto>AllPost=post.stream().map((postData)->modelMapper.map(postData,PostDto.class)).toList();
        return AllPost;
    }

    @Override
    public PostDto savedPost(int postId, int UserId) throws ResourceNotFoundException {
        User user = userRepo.findById(UserId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", UserId));
        Post post = postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with postId", postId));

        if(user.getSavedpost().contains(post)) user.getSavedpost().remove(post);
        else user.getSavedpost().add(post);

        userRepo.save(user);
        PostDto SavedPost=modelMapper.map(post,PostDto.class);

        return SavedPost;
    }

    @Override
    public PostDto likePost(int postId, int userId) throws ResourceNotFoundException {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", userId));
        Post post = postRepo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with postId", postId));

         if(post.getLiked().contains(user))
             post.getLiked().remove(user);// if user is liked then on click it becomes unliked
         else
             post.getLiked().add(user); // for like by the user

        postRepo.save(post);
        PostDto LikedPost=modelMapper.map(post,PostDto.class);
        return LikedPost;
    }
    
    @Override
    public List<PostDto> getSavedPosts(int userId) throws ResourceNotFoundException {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", userId));
        
        // Get the saved posts from the user
        List<Post> savedPosts = user.getSavedpost();
        
        // Map the posts to DTOs
        List<PostDto> savedPostDtos = savedPosts.stream()
            .map(post -> modelMapper.map(post, PostDto.class))
            .toList();
            
        return savedPostDtos;
    }
}
