package com.socialmedai.socialmediaapp.Controller;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Repository.UserRepo;
import com.socialmedai.socialmediaapp.Service.ReelsService;
import com.socialmedai.socialmediaapp.Service.UserService;
import com.socialmedai.socialmediaapp.SocialDto.ReelsCommentDto;
import com.socialmedai.socialmediaapp.SocialDto.ReelsDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/reels")
public class ReelsController {

    @Autowired
    private ReelsService reelsService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping(path = "/create")
    public ResponseEntity<ReelsDto> createReels(@RequestBody ReelsDto reelsDto, @RequestHeader("Authorization") String jwt) {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        ReelsDto createdReel = reelsService.createReels(reelsDto, reqUser);
        return ResponseEntity.ok(createdReel);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<ReelsDto>> findAllReels() {
        List<ReelsDto> reels = reelsService.findAllReels();
        return ResponseEntity.ok(reels);
    }

    @GetMapping(path = "/user/{userId}")
    public ResponseEntity<List<ReelsDto>> findUserReels(@PathVariable int userId) throws ResourceNotFoundException {
        List<ReelsDto> reels = reelsService.findUserReels(userId);
        return ResponseEntity.ok(reels);
    }
    
    @PutMapping(path = "/{reelId}/like")
    public ResponseEntity<ReelsDto> likeReel(
            @PathVariable int reelId,
            @RequestHeader("Authorization") String jwt) throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        ReelsDto updatedReel = reelsService.likeReel(reelId, reqUser.getId());
        return ResponseEntity.ok(updatedReel);
    }
    
    @PutMapping(path = "/{reelId}/save")
    public ResponseEntity<ReelsDto> saveReel(
            @PathVariable int reelId,
            @RequestHeader("Authorization") String jwt) throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        ReelsDto updatedReel = reelsService.saveReel(reelId, reqUser.getId());
        return ResponseEntity.ok(updatedReel);
    }
    
    @GetMapping(path = "/saved")
    public ResponseEntity<List<ReelsDto>> getSavedReels(
            @RequestHeader("Authorization") String jwt) throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        List<ReelsDto> savedReels = reelsService.getSavedReels(reqUser.getId());
        return ResponseEntity.ok(savedReels);
    }
    
    @PostMapping(path = "/{reelId}/comment")
    public ResponseEntity<ReelsCommentDto> addComment(
            @PathVariable int reelId,
            @RequestBody ReelsCommentDto commentDto,
            @RequestHeader("Authorization") String jwt) throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        ReelsCommentDto savedComment = reelsService.addComment(commentDto, reelId, reqUser.getId());
        return ResponseEntity.ok(savedComment);
    }
    
    @GetMapping(path = "/{reelId}/comments")
    public ResponseEntity<List<ReelsCommentDto>> getReelComments(
            @PathVariable int reelId) throws ResourceNotFoundException {
        List<ReelsCommentDto> comments = reelsService.getReelComments(reelId);
        return ResponseEntity.ok(comments);
    }
    
    @DeleteMapping(path = "/comment/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable int commentId,
            @RequestHeader("Authorization") String jwt) throws ResourceNotFoundException {
        UserDto reqUser = userService.findUserFromTwt(jwt);
        reelsService.deleteComment(commentId, reqUser.getId());
        return ResponseEntity.ok().build();
    }
    
    @PostMapping(path = "/{reelId}/share")
    public ResponseEntity<ReelsDto> shareReel(
            @PathVariable int reelId) throws ResourceNotFoundException {
        ReelsDto sharedReel = reelsService.shareReel(reelId);
        return ResponseEntity.ok(sharedReel);
    }
}
