import { Avatar, Button, Card, CardHeader, IconButton } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchUserAction, sendFollowRequestAction } from '../../redux/User/user.action'

const PopularUserCard = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authUser = useSelector(state => state.auth.userProfile);
    const { requestedUserIds, sendRequestSuccess } = useSelector(state => state.user);
    const [localRequestSent, setLocalRequestSent] = useState(false);
    
    // If no user is passed, use a default user for display
    const displayUser = user || {
        id: 9939,
        firstName: "Ramji",
        lastName: "Kumar",
        image: null
    };
    
    useEffect(() => {
        if (!user) {
            // If no users are provided, fetch some suggestions
            dispatch(searchUserAction(''));
        }
    }, [dispatch, user]);
    
    // Track when a request is successfully sent
    useEffect(() => {
        if (sendRequestSuccess && localRequestSent) {
            console.log("Request sent successfully to:", displayUser.id);
        }
    }, [sendRequestSuccess, localRequestSent, displayUser.id]);
    
    // Check if the current user has already sent a request to this user
    const hasSentRequest = () => {
        if (!authUser || !displayUser) return false;
        
        // Check both Redux state and local component state
        return (
            authUser.sentFollowRequests?.includes(displayUser.id) || 
            requestedUserIds.includes(displayUser.id) ||
            localRequestSent
        );
    };
    
    // Check if the current user is already following this user
    const isFollowing = () => {
        if (!authUser || !displayUser) return false;
        
        return authUser.followings?.includes(displayUser.id);
    };
    
    const handleSendFollowRequest = (e) => {
        e.stopPropagation(); // Prevent navigating to profile when clicking the button
        
        // Only send the request if we haven't already sent one
        if (!hasSentRequest() && !isFollowing()) {
            console.log("Sending follow request to:", displayUser.id);
            dispatch(sendFollowRequestAction(displayUser.id));
            // Update local state immediately for better UX
            setLocalRequestSent(true);
        }
    };
    
    const handleProfileClick = () => {
        navigate(`/profile/${displayUser.id}`);
    };
    
    // Determine button text based on follow status
    const getButtonText = () => {
        if (isFollowing()) return "FOLLOWING";
        if (hasSentRequest()) return "REQUESTED";
        return "FOLLOW";
    };
    
    // Determine button props based on follow status
    const getButtonProps = () => {
        const isDisabled = isFollowing() || hasSentRequest();
        
        return {
            sx: { 
                color: isDisabled ? 'gray' : 'primary.main', 
                borderRadius: '10px', 
                fontSize: '10px',
                '&:hover': {
                    backgroundColor: isDisabled ? 'transparent' : 'rgba(25, 118, 210, 0.04)'
                }
            },
            disabled: isDisabled
        };
    };
    
    return (
        <div 
            style={{ cursor: 'pointer' }} 
            onClick={handleProfileClick}
        >
            <CardHeader 
                sx={{ justifyContent: 'space-between' }}
                avatar={
                    <Avatar 
                        sx={{ 
                            bgcolor: red[500], 
                            width: '30px', 
                            height: '30px' 
                        }} 
                        aria-label="user-avatar"
                        src={displayUser.image}
                    >
                        {displayUser.firstName?.charAt(0)}
                    </Avatar>
                }
                action={
                    <Button 
                        {...getButtonProps()}
                        onClick={handleSendFollowRequest}
                    >
                        {getButtonText()}
                    </Button>
                }
                title={`${displayUser.firstName} ${displayUser.lastName || ''}`}
                subheader={`@${displayUser.firstName?.toLowerCase()}${displayUser.id}`}
            />
        </div>
    )
}

export default PopularUserCard