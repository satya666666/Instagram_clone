package com.socialmedai.socialmediaapp.Service;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.Story;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.SocialDto.StoryDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface StoryService {

    public StoryDto createStory(StoryDto storyDto, UserDto userDto) throws ResourceNotFoundException;
    public List<StoryDto>findStoryById(int userId) throws ResourceNotFoundException;
}
