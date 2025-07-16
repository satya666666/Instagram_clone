package com.socialmedai.socialmediaapp.Controller;

import com.socialmedai.socialmediaapp.ApiResponse.ApiResponse;
import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Service.PostService;
import com.socialmedai.socialmediaapp.Service.UserService;
import com.socialmedai.socialmediaapp.SocialDto.PostDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/posts")
public class PostController {
    @Autowired
    PostService postService;


    @Autowired
    UserService userService;
                                           // create post
    @PostMapping(path = "/user")
    public ResponseEntity<PostDto>CreatePostHandler(@RequestBody PostDto postDto ,
                                                    @RequestHeader ("Authorization")String jwt)
            throws ResourceNotFoundException {
        UserDto reqUser=userService.findUserFromTwt(jwt);
        PostDto postDto1=postService.createNewpost(postDto,reqUser.getId());
        return new  ResponseEntity<>(postDto1, HttpStatus.CREATED);
    }

                                           // delete post
    @DeleteMapping(path = "/delete/{postId}")
    public ResponseEntity<ApiResponse> DeletePostHandler(@PathVariable int postId,
                                                         @RequestHeader ("Authorization")String jwt) throws Exception {
       UserDto reqUser=userService.findUserFromTwt(jwt);

        String message=postService.deletePost(postId,reqUser.getId());
        ApiResponse apiResponse=new ApiResponse(message,true);
        return  new ResponseEntity<>(apiResponse,HttpStatus.OK);

    }

    // find post by id

    @GetMapping(path = "/id/{postId}")
    public ResponseEntity<PostDto>findPostByIdHandler(@PathVariable int postId) throws ResourceNotFoundException {
        PostDto postDto=postService.findPostById(postId);

        return ResponseEntity.ok(postDto);
    }

    // find all user post
    @GetMapping(path = "/AllUserPost/user/{userId}")
    ResponseEntity<List<PostDto>>AllUserPostHandler(@PathVariable int userId)
            throws ResourceNotFoundException {
        List<PostDto>AllUserPosts=postService.findPostByUserId(userId);
        return ResponseEntity.ok(AllUserPosts);
    }


    @GetMapping(path = "/AllPost")
    ResponseEntity<List<PostDto>>AllPostHandler() throws ResourceNotFoundException {
        List<PostDto>AllUserPosts=postService.findAllpost();
        return ResponseEntity.ok(AllUserPosts);
    }

    // Get posts for the currently logged-in user
    @GetMapping(path = "/my-posts")
    ResponseEntity<List<PostDto>> getCurrentUserPostsHandler(@RequestHeader("Authorization") String jwt) 
            throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        List<PostDto> userPosts = postService.findPostByUserId(reqUser.getId());
        return ResponseEntity.ok(userPosts);
    }
    
    // Get posts from users that the current user follows
    @GetMapping(path = "/following")
    ResponseEntity<List<PostDto>> getFollowingPostsHandler(@RequestHeader("Authorization") String jwt) 
            throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        
        // Get the list of users that the current user follows
        Set<Integer> followingIds = reqUser.getFollowings();
        List<PostDto> followingPosts = new ArrayList<>();
        
        // For each user that the current user follows, get their posts
        if (followingIds != null && !followingIds.isEmpty()) {
            for (Integer userId : followingIds) {
                List<PostDto> userPosts = postService.findPostByUserId(userId);
                followingPosts.addAll(userPosts);
            }
            
            // Sort posts by creation date (newest first)
            followingPosts = followingPosts.stream()
                .sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()))
                .collect(Collectors.toList());
        }
        
        return ResponseEntity.ok(followingPosts);
    }

     // savedPost
    @PutMapping (path = "/saved/post/{postId}")
    public ResponseEntity<PostDto>savedPostHandler(@PathVariable int postId,
                                                   @RequestHeader ("Authorization")String jwt)
            throws ResourceNotFoundException {

        UserDto reqUser=userService.findUserFromTwt(jwt);

        PostDto postDto=postService.savedPost(postId,reqUser.getId());


        return ResponseEntity.ok(postDto);
    }

    // Get saved posts
    @GetMapping(path = "/saved")
    public ResponseEntity<List<PostDto>> getSavedPostsHandler(@RequestHeader ("Authorization")String jwt)
            throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        List<PostDto> savedPosts = postService.getSavedPosts(reqUser.getId());
        return ResponseEntity.ok(savedPosts);
    }

//    liked poost

    @PutMapping (path = "/like/{postId}")
    public ResponseEntity<PostDto>likedPostHandler(@PathVariable int postId,@RequestHeader ("Authorization")String jwt) throws ResourceNotFoundException {

        UserDto reqUser=userService.findUserFromTwt(jwt);
        PostDto postDto=postService.likePost(postId,reqUser.getId());

        return ResponseEntity.ok(postDto);
    }





}
