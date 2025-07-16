package com.socialmedai.socialmediaapp.ServiceImpl;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.Story;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Repository.StoryRepo;
import com.socialmedai.socialmediaapp.Repository.UserRepo;
import com.socialmedai.socialmediaapp.Service.StoryService;
import com.socialmedai.socialmediaapp.SocialDto.StoryDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class StoryServiceImpl implements StoryService {
    @Autowired
    private  StoryRepo storyRepo;
    @Autowired
   private ModelMapper modelMapper;
    @Autowired
   private UserRepo userRepo;
    @Override
    public StoryDto createStory(StoryDto storyDto, UserDto userDto) throws ResourceNotFoundException {
        User user = userRepo.findById(userDto.getId()).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", userDto.getId()));

      Story story=modelMapper.map(storyDto,Story.class);
      story.setUser(user);
      story.setCreatedAt(LocalDateTime.now());
        Story story1 = storyRepo.save(story);

        System.out.println(story1);
       StoryDto storyDto1=modelMapper.map(story1,StoryDto.class);

        System.out.println(storyDto1);
       return storyDto1;
    }

    @Override
    public List<StoryDto> findStoryById(int userId) throws ResourceNotFoundException {
        User user = userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user not Found ", "with userId", userId));
     List<Story> stories=storyRepo.findByUserId(userId);

       List<StoryDto>storyDtos=stories.stream().map(story -> modelMapper.map(story,StoryDto.class)).toList();

        return storyDtos;
    }
}
