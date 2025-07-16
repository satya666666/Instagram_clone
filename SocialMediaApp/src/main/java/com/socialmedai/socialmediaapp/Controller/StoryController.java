package com.socialmedai.socialmediaapp.Controller;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Service.StoryService;
import com.socialmedai.socialmediaapp.Service.UserService;
import com.socialmedai.socialmediaapp.SocialDto.StoryDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/story")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @Autowired
    private UserService userService;

    @PostMapping(path = "/create")
    public ResponseEntity<StoryDto>createStory(@RequestBody StoryDto storyDto, @RequestHeader ("Authorization") String jwt) throws ResourceNotFoundException {
        UserDto reqUser=userService.findUserFromTwt(jwt);
        StoryDto storyDto1=storyService.createStory(storyDto,reqUser);
        return ResponseEntity.ok(storyDto1);
    }


    @GetMapping(path = "/user/{id}")
    public ResponseEntity<List<StoryDto>> findStoryByUserId(@PathVariable int id ,@RequestHeader ("Authorization") String jwt) throws ResourceNotFoundException {
        UserDto reqUser=userService.findUserFromTwt(jwt);
        List<StoryDto>storyDtos=storyService.findStoryById(id);
        return ResponseEntity.ok(storyDtos);
    }


}
