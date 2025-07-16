package com.socialmedai.socialmediaapp.Controller;


import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.Comment;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Service.CommentService;
import com.socialmedai.socialmediaapp.Service.UserService;
import com.socialmedai.socialmediaapp.SocialDto.CommentDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api")
public class CommentController {


    @Autowired
    private CommentService commentService;

    @Autowired
    UserService userService;

    @PostMapping(path = "/comment/post/{postId}")
    public ResponseEntity<CommentDto>createComment(@RequestBody CommentDto commentDto,
                                                   @RequestHeader("Authorization")String jwt,@PathVariable int postId) throws ResourceNotFoundException {

        UserDto userdto=userService.findUserFromTwt(jwt);

        CommentDto createdComment=commentService.createComment(commentDto,postId,userdto.getId());

        return  ResponseEntity.ok(createdComment);
    }



    @PutMapping(path = "/like/post/{commentId}")
    public ResponseEntity<CommentDto>likeComment(
                                                   @RequestHeader("Authorization")String jwt,@PathVariable int commentId) throws ResourceNotFoundException {

        UserDto userdto=userService.findUserFromTwt(jwt);

        CommentDto likeComment=commentService.likeComment(commentId,userdto.getId());

        return  ResponseEntity.ok(likeComment);
    }

    @GetMapping(path = "/find/{commentId}")
    public  ResponseEntity<CommentDto> likdComment(@PathVariable int commentId) throws ResourceNotFoundException {

        CommentDto commentDto=commentService.findCommentById(commentId);
        return  ResponseEntity.ok(commentDto);
    }




}
