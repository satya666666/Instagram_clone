# Reels Feature Implementation

## Overview
This document provides an overview of the Reels feature implementation in the Social Media application. The Reels feature allows users to create, view, like, comment, save, and share short video content similar to Instagram Reels or TikTok.

## Features Implemented

### Backend (Java Spring Boot)
1. **Models**:
   - `Reels`: Contains fields for title, video URL, user, likes, comments, and creation timestamp
   - `ReelsComment`: Handles comments on reels with user reference and content

2. **DTOs**:
   - `ReelsDto`: Data transfer object for Reels with all necessary fields
   - `ReelsCommentDto`: Data transfer object for comments on reels

3. **Repositories**:
   - `ReelsRepo`: JPA repository for Reels entity
   - `ReelsCommentRepo`: JPA repository for ReelsComment entity

4. **Services**:
   - `ReelsService`: Interface defining all reels-related operations
   - `ReelsServiceImpl`: Implementation of the service with methods for:
     - Creating reels
     - Finding reels (all reels and user-specific reels)
     - Liking/unliking reels
     - Saving/unsaving reels
     - Adding comments
     - Getting comments
     - Deleting comments
     - Sharing reels

5. **Controllers**:
   - `ReelsController`: Exposes REST endpoints for all reels operations

### Frontend (React)
1. **Redux Integration**:
   - Action Types: Defined in `Reels.actionType.js`
   - Action Creators: Implemented in `Reels.action.js`
   - Reducer: Implemented in `Reels.reducer.js`
   - Store Integration: Added reels reducer to the Redux store

2. **Components**:
   - `CreateReels`: Form for uploading and creating new reels
   - `Reels`: Main component for viewing reels in a TikTok-like scrollable interface
   - `ReelCard`: Individual reel display with video player and interaction buttons
   - `UserReels`: Component to display a user's reels in their profile
   - `SavedReels`: Component to display reels saved by the user
   - `ReelsNavigation`: Navigation component for the reels interface

3. **Utilities**:
   - `uploadToCloudinary.js`: Utility for uploading videos to Cloudinary
   - `ReelsDto.js`: Frontend DTO classes to match backend structure

4. **Profile Integration**:
   - Updated Profile component to include reels tab
   - Added saved reels tab alongside saved posts

## API Endpoints

### Reels Endpoints
- `POST /api/reels/create`: Create a new reel
- `GET /api/reels/all`: Get all reels
- `GET /api/reels/user/{userId}`: Get reels by user ID
- `PUT /api/reels/{reelId}/like`: Like or unlike a reel
- `PUT /api/reels/{reelId}/save`: Save or unsave a reel
- `GET /api/reels/saved`: Get saved reels for the current user
- `POST /api/reels/{reelId}/comment`: Add a comment to a reel
- `GET /api/reels/{reelId}/comments`: Get comments for a specific reel
- `DELETE /api/reels/comment/{commentId}`: Delete a comment
- `POST /api/reels/{reelId}/share`: Share a reel

## User Flow
1. User can create a new reel by uploading a video through the CreateReels component
2. User can view reels in a vertical scrollable interface similar to TikTok
3. User can like, comment, save, and share reels
4. User can view their own reels in their profile
5. User can view reels they've saved in their profile's saved tab
6. User can view reels by a specific user by visiting their profile

## Technical Implementation Details

### Video Handling
- Videos are uploaded to Cloudinary using the `uploadToCloudinary` utility
- Video URLs are stored in the database and retrieved for playback
- Videos autoplay when in view and pause when scrolled away

### State Management
- Redux is used for state management with actions for all CRUD operations
- Reels state includes arrays for all reels, user reels, and saved reels
- Comments are stored in a nested object structure by reel ID

### UI/UX Considerations
- TikTok-like full-screen vertical scrolling interface
- Double-tap or heart button to like
- Comment section slides in from the side
- Save button toggles saved state
- Share functionality uses Web Share API when available

## Future Enhancements
1. Video editing capabilities before posting
2. Filters and effects for reels
3. Hashtags and discovery features
4. Analytics for reel creators
5. Improved video compression and optimization

## Testing
To test the reels functionality:
1. Create a new reel using the Create Reel button
2. View reels in the main reels feed
3. Try liking, commenting, saving, and sharing reels
4. Check your profile to see your created reels
5. Check the saved tab to see your saved reels
