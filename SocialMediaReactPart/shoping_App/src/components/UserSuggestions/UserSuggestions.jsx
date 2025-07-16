import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction, sendFollowRequestAction } from '../../redux/User/user.action';
import { 
  Avatar, 
  Box, 
  Button, 
  Card, 
  CircularProgress, 
  Divider, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Typography,
  Popover
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFollowButton = styled(Button)({
  fontSize: '12px',
  padding: '2px 12px',
  minWidth: 'auto',
  backgroundColor: 'transparent',
  color: '#1976d2',
  border: '1px solid #1976d2',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
  },
});

const UserSuggestions = ({ anchorEl, open, onClose }) => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.user);
  const { user } = useSelector(state => state.auth);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (open) {
      dispatch(searchUserAction(''));
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (users && users.length > 0) {
      // Filter out current user and limit to 5 suggestions
      const filteredUsers = users
        .filter(u => u.id !== user?.id)
        .slice(0, 5);
      setSuggestions(filteredUsers);
    }
  }, [users, user]);

  const handleSendFollowRequest = (userId) => {
    console.log("Sending follow request to user ID:", userId);
    dispatch(sendFollowRequestAction(userId));
  };

  // Check if the current user has sent a follow request to this user
  const hasSentRequest = (targetUser) => {
    if (!user || !targetUser) return false;
    
    if (targetUser.pendingFollowRequests && Array.isArray(targetUser.pendingFollowRequests)) {
      return targetUser.pendingFollowRequests.some(id => id === user.id);
    }
    
    if (user.sentFollowRequests && Array.isArray(user.sentFollowRequests)) {
      return user.sentFollowRequests.some(id => id === targetUser.id);
    }
    
    return false;
  };
  
  // Check if the current user is following this user
  const isFollowing = (targetUser) => {
    if (!user || !targetUser) return false;
    
    if (targetUser.followers && Array.isArray(targetUser.followers)) {
      return targetUser.followers.some(id => id === user.id);
    }
    
    if (user.followings && Array.isArray(user.followings)) {
      return user.followings.some(id => id === targetUser.id);
    }
    
    return false;
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        sx: { 
          width: 300,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          mt: 1
        }
      }}
    >
      <Card sx={{ p: 0, boxShadow: 'none' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Suggestions for You
          </Typography>
          <Typography 
            variant="body2" 
            color="primary" 
            sx={{ cursor: 'pointer', fontSize: '12px' }}
            onClick={() => {
              onClose();
              window.location.href = '/search';
            }}
          >
            View All
          </Typography>
        </Box>
        
        <Divider />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : suggestions.length > 0 ? (
          <List sx={{ p: 0 }}>
            {suggestions.map(userItem => (
              <ListItem
                key={userItem.id}
                sx={{ 
                  py: 1.5,
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                }}
                secondaryAction={
                  isFollowing(userItem) ? (
                    <StyledFollowButton disabled>
                      Following
                    </StyledFollowButton>
                  ) : hasSentRequest(userItem) ? (
                    <StyledFollowButton disabled>
                      Requested
                    </StyledFollowButton>
                  ) : (
                    <StyledFollowButton
                      onClick={() => handleSendFollowRequest(userItem.id)}
                    >
                      FOLLOW
                    </StyledFollowButton>
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar 
                    sx={{ 
                      bgcolor: '#f44336',
                      width: 36, 
                      height: 36,
                      fontSize: '1rem'
                    }}
                  >
                    {userItem.firstName?.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" fontWeight="medium">
                      {userItem.firstName} {userItem.lastName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      @{userItem.firstName.toLowerCase() + userItem.id}
                    </Typography>
                  }
                  sx={{ m: 0 }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No suggestions available
            </Typography>
          </Box>
        )}
      </Card>
    </Popover>
  );
};

export default UserSuggestions;
