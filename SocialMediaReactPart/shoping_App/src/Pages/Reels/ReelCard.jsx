import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, IconButton, TextField, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import { addReelCommentAction, getReelCommentsAction, shareReelAction } from '../ReelsReducer/Reels.action';

const ReelCard = ({ reel, isActive, onLike, onSave }) => {
    const dispatch = useDispatch();
    const videoRef = useRef(null);
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { auth } = useSelector(state => state);
    const { reelComments, commentLoading } = useSelector(state => state.reels);
    
    // Get comments for this reel
    const comments = reelComments[reel.reelsId] || [];

    useEffect(() => {
        // Play/pause video based on whether this reel is active
        if (videoRef.current) {
            if (isActive) {
                videoRef.current.play().catch(err => console.error("Error playing video:", err));
            } else {
                videoRef.current.pause();
            }
        }
    }, [isActive]);

    useEffect(() => {
        // Load comments when comments panel is opened
        if (showComments && (!comments || comments.length === 0)) {
            dispatch(getReelCommentsAction(reel.reelsId));
        }
    }, [showComments, reel.reelsId, comments, dispatch]);

    const handleLike = () => {
        onLike(reel.reelsId);
    };

    const handleSave = () => {
        onSave(reel.reelsId);
    };

    const handleShare = () => {
        dispatch(shareReelAction(reel.reelsId));
        
        // Use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: reel.title,
                text: `Check out this reel by ${reel.user.firstName} ${reel.user.lastName}`,
                url: window.location.href,
            })
            .catch(error => console.log('Error sharing:', error));
        } else {
            // Fallback - copy link to clipboard
            const url = window.location.href;
            navigator.clipboard.writeText(url)
                .then(() => alert('Link copied to clipboard!'))
                .catch(err => console.error('Failed to copy link:', err));
        }
    };

    const handleToggleComments = () => {
        setShowComments(!showComments);
    };

    const handleAddComment = () => {
        if (commentText.trim()) {
            dispatch(addReelCommentAction(reel.reelsId, commentText.trim()));
            setCommentText('');
        }
    };

    return (
        <div className="relative h-full w-full bg-black flex justify-center">
            {/* Video */}
            <video
                ref={videoRef}
                src={reel.video}
                className="h-full object-contain"
                loop
                muted={false}
                playsInline
                onClick={() => videoRef.current && (videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause())}
            />
            
            {/* Overlay with user info and title */}
            <div className="absolute bottom-20 left-4 text-white z-10">
                <div className="flex items-center mb-2">
                    <Avatar 
                        src={reel.user.userImage} 
                        alt={reel.user.firstName}
                        className="mr-2"
                    />
                    <span className="font-bold">{reel.user.firstName} {reel.user.lastName}</span>
                </div>
                <p className="text-sm">{reel.title}</p>
            </div>
            
            {/* Action buttons */}
            <div className="absolute right-4 bottom-20 flex flex-col space-y-4 text-white z-10">
                <div className="flex flex-col items-center">
                    <IconButton onClick={handleLike} color="inherit">
                        {reel.isLiked ? (
                            <FavoriteIcon style={{ color: 'red' }} />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                    <span className="text-xs">{reel.likedByUsers?.length || 0}</span>
                </div>
                
                <div className="flex flex-col items-center">
                    <IconButton onClick={handleToggleComments} color="inherit">
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                    <span className="text-xs">{reel.comments?.length || 0}</span>
                </div>
                
                <div className="flex flex-col items-center">
                    <IconButton onClick={handleSave} color="inherit">
                        {reel.isSaved ? (
                            <BookmarkIcon style={{ color: 'white' }} />
                        ) : (
                            <BookmarkBorderIcon />
                        )}
                    </IconButton>
                    <span className="text-xs">Save</span>
                </div>
                
                <div className="flex flex-col items-center">
                    <IconButton onClick={handleShare} color="inherit">
                        <ShareIcon />
                    </IconButton>
                    <span className="text-xs">Share</span>
                </div>
            </div>
            
            {/* Comments Panel */}
            {showComments && (
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-white z-20 overflow-y-auto">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="font-bold">Comments</h3>
                        <IconButton onClick={handleToggleComments}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    
                    <div className="p-4 flex-grow overflow-y-auto max-h-[calc(100%-120px)]">
                        {commentLoading ? (
                            <div className="text-center py-4">Loading comments...</div>
                        ) : comments.length === 0 ? (
                            <div className="text-center py-4 text-gray-500">No comments yet. Be the first to comment!</div>
                        ) : (
                            comments.map(comment => (
                                <div key={comment.id} className="mb-4">
                                    <div className="flex items-start">
                                        <Avatar 
                                            src={comment.user.userImage} 
                                            alt={comment.user.firstName}
                                            className="mr-2 w-8 h-8"
                                        />
                                        <div>
                                            <div className="bg-gray-100 p-2 rounded-lg">
                                                <p className="font-bold text-sm">{comment.user.firstName} {comment.user.lastName}</p>
                                                <p className="text-sm">{comment.content}</p>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    
                    <div className="p-4 border-t">
                        <div className="flex">
                            <TextField
                                placeholder="Add a comment..."
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                            />
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={handleAddComment}
                                disabled={!commentText.trim() || commentLoading}
                                className="ml-2"
                            >
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReelCard;
