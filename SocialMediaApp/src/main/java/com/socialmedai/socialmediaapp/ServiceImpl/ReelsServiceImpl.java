package com.socialmedai.socialmediaapp.ServiceImpl;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.Models.Reels;
import com.socialmedai.socialmediaapp.Models.ReelsComment;
import com.socialmedai.socialmediaapp.Models.User;
import com.socialmedai.socialmediaapp.Repository.ReelsCommentRepo;
import com.socialmedai.socialmediaapp.Repository.ReeslRepo;
import com.socialmedai.socialmediaapp.Repository.UserRepo;
import com.socialmedai.socialmediaapp.Service.ReelsService;
import com.socialmedai.socialmediaapp.SocialDto.ReelsCommentDto;
import com.socialmedai.socialmediaapp.SocialDto.ReelsDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ReelsServiceImpl implements ReelsService {

    @Autowired
    private ReeslRepo reeslRepo;

    @Autowired
    private UserRepo userRepo;
    
    @Autowired
    private ReelsCommentRepo reelsCommentRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ReelsDto createReels(ReelsDto reelsDto, UserDto userDto) {
        User user = userRepo.findById(userDto.getId()).orElseThrow();
        
        Reels reels = modelMapper.map(reelsDto, Reels.class);
        reels.setUser(user);
        reels.setCreatedAt(LocalDateTime.now());
        
        Reels savedReels = reeslRepo.save(reels);
        
        return modelMapper.map(savedReels, ReelsDto.class);
    }

    @Override
    public List<ReelsDto> findAllReels() {
        List<Reels> reels = reeslRepo.findAll();
        return reels.stream()
                .map(reel -> modelMapper.map(reel, ReelsDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ReelsDto> findUserReels(int userId) throws ResourceNotFoundException {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "with id", userId));
        
        List<Reels> reels = reeslRepo.findByUserId(userId);
        
        return reels.stream()
                .map(reel -> modelMapper.map(reel, ReelsDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ReelsDto likeReel(int reelId, int userId) throws ResourceNotFoundException {
        Reels reel = reeslRepo.findById(reelId)
                .orElseThrow(() -> new ResourceNotFoundException("Reel not found", "with id", reelId));
        
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "with id", userId));
        
        // Check if user already liked this reel
        if (reel.getLiked().contains(user)) {
            // Unlike the reel
            reel.getLiked().remove(user);
        } else {
            // Like the reel
            reel.getLiked().add(user);
        }
        
        Reels updatedReel = reeslRepo.save(reel);
        ReelsDto reelsDto = modelMapper.map(updatedReel, ReelsDto.class);
        
        // Set liked status for the current user
        reelsDto.setLiked(updatedReel.getLiked().contains(user));
        
        // Set liked by users IDs
        Set<Integer> likedByUsers = updatedReel.getLiked().stream()
                .map(User::getId)
                .collect(Collectors.toSet());
        reelsDto.setLikedByUsers(likedByUsers);
        
        return reelsDto;
    }

    @Override
    public ReelsDto saveReel(int reelId, int userId) throws ResourceNotFoundException {
        Reels reel = reeslRepo.findById(reelId)
                .orElseThrow(() -> new ResourceNotFoundException("Reel not found", "with id", reelId));
        
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "with id", userId));
        
        // Check if the reel is already in user's saved collection
        if (user.getSavedReels() == null) {
            user.setSavedReels(new HashSet<>());
        }
        
        if (user.getSavedReels().contains(reel)) {
            // Remove from saved
            user.getSavedReels().remove(reel);
        } else {
            // Add to saved
            user.getSavedReels().add(reel);
        }
        
        userRepo.save(user);
        
        ReelsDto reelsDto = modelMapper.map(reel, ReelsDto.class);
        reelsDto.setSaved(user.getSavedReels().contains(reel));
        
        return reelsDto;
    }

    @Override
    public List<ReelsDto> getSavedReels(int userId) throws ResourceNotFoundException {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "with id", userId));
        
        if (user.getSavedReels() == null) {
            return List.of();
        }
        
        return user.getSavedReels().stream()
                .map(reel -> {
                    ReelsDto dto = modelMapper.map(reel, ReelsDto.class);
                    dto.setSaved(true);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public ReelsCommentDto addComment(ReelsCommentDto commentDto, int reelId, int userId) throws ResourceNotFoundException {
        Reels reel = reeslRepo.findById(reelId)
                .orElseThrow(() -> new ResourceNotFoundException("Reel not found", "with id", reelId));
        
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "with id", userId));
        
        ReelsComment comment = new ReelsComment();
        comment.setContent(commentDto.getContent());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUser(user);
        comment.setReels(reel);
        
        ReelsComment savedComment = reelsCommentRepo.save(comment);
        
        return modelMapper.map(savedComment, ReelsCommentDto.class);
    }

    @Override
    public List<ReelsCommentDto> getReelComments(int reelId) throws ResourceNotFoundException {
        reeslRepo.findById(reelId)
                .orElseThrow(() -> new ResourceNotFoundException("Reel not found", "with id", reelId));
        
        List<ReelsComment> comments = reelsCommentRepo.findByReelsReelsId(reelId);
        
        return comments.stream()
                .map(comment -> modelMapper.map(comment, ReelsCommentDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteComment(int commentId, int userId) throws ResourceNotFoundException {
        ReelsComment comment = reelsCommentRepo.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found", "with id", commentId));
        
        // Check if the user is the owner of the comment
        if (comment.getUser().getId() != userId) {
            throw new ResourceNotFoundException("Not authorized", "to delete comment", commentId);
        }
        
        reelsCommentRepo.delete(comment);
    }

    @Override
    public ReelsDto shareReel(int reelId) throws ResourceNotFoundException {
        Reels reel = reeslRepo.findById(reelId)
                .orElseThrow(() -> new ResourceNotFoundException("Reel not found", "with id", reelId));
        
        // For sharing, we would typically increment a share count
        // Since we don't have a share count field, we'll just return the reel
        
        return modelMapper.map(reel, ReelsDto.class);
    }
}
