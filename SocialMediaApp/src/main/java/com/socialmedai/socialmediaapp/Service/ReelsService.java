package com.socialmedai.socialmediaapp.Service;

import com.socialmedai.socialmediaapp.ExceptionHandler.ResourceNotFoundException;
import com.socialmedai.socialmediaapp.SocialDto.ReelsCommentDto;
import com.socialmedai.socialmediaapp.SocialDto.ReelsDto;
import com.socialmedai.socialmediaapp.SocialDto.UserDto;

import java.util.List;

public interface ReelsService {

    /**
     * Create a new reel
     */
    public ReelsDto createReels(ReelsDto reelsDto, UserDto userDto);
    
    /**
     * Find all reels
     */
    public List<ReelsDto> findAllReels();
    
    /**
     * Find reels by user ID
     */
    public List<ReelsDto> findUserReels(int userId) throws ResourceNotFoundException;
    
    /**
     * Like or unlike a reel
     */
    public ReelsDto likeReel(int reelId, int userId) throws ResourceNotFoundException;
    
    /**
     * Save a reel to user's saved collection
     */
    public ReelsDto saveReel(int reelId, int userId) throws ResourceNotFoundException;
    
    /**
     * Get saved reels for a user
     */
    public List<ReelsDto> getSavedReels(int userId) throws ResourceNotFoundException;
    
    /**
     * Add a comment to a reel
     */
    public ReelsCommentDto addComment(ReelsCommentDto commentDto, int reelId, int userId) throws ResourceNotFoundException;
    
    /**
     * Get all comments for a reel
     */
    public List<ReelsCommentDto> getReelComments(int reelId) throws ResourceNotFoundException;
    
    /**
     * Delete a comment
     */
    public void deleteComment(int commentId, int userId) throws ResourceNotFoundException;
    
    /**
     * Share a reel (increment share count)
     */
    public ReelsDto shareReel(int reelId) throws ResourceNotFoundException;
}
