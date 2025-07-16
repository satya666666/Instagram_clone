import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Box,
  Divider,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { markMessagesAsRead } from '../ChatReducer/Chat.action';

const MessageNotifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Get unread messages by user from Redux
  const unreadMessagesByUser = useSelector(state => state.chat.unreadMessagesByUser || {});
  
  // Calculate total unread messages
  const totalUnreadMessages = Object.values(unreadMessagesByUser)
    .reduce((total, userData) => total + userData.count, 0);
  
  // Handle opening the notification menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  // Handle closing the notification menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Handle clicking on a notification
  const handleNotificationClick = (chatId, userId) => {
    // Mark messages from this user as read
    dispatch(markMessagesAsRead(chatId));
    
    // Navigate to the chat
    navigate(`/messages?chatId=${chatId}`);
    
    // Close the menu
    handleMenuClose();
  };
  
  // Format timestamp to a readable format
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    
    // If it's today, show the time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If it's within the last week, show the day
    const daysDiff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (daysDiff < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise, show the date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={handleMenuOpen}
        sx={{ mr: 1 }}
      >
        <Badge badgeContent={totalUnreadMessages} color="error" max={99}>
          <MessageIcon />
        </Badge>
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 320,
            maxHeight: 400,
            overflow: 'auto'
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Typography sx={{ p: 2, fontWeight: 'bold' }}>
          Message Notifications
        </Typography>
        
        <Divider />
        
        {Object.keys(unreadMessagesByUser).length > 0 ? (
          Object.entries(unreadMessagesByUser).map(([userId, userData]) => {
            const { user, count, lastMessage } = userData;
            if (!user || !lastMessage) return null;
            
            return (
              <MenuItem 
                key={userId} 
                onClick={() => handleNotificationClick(lastMessage.chat.id, userId)}
                sx={{ py: 1.5 }}
              >
                <ListItemAvatar>
                  <Avatar 
                    alt={user.firstName} 
                    src={user.profilePicture || ''}
                    sx={{ bgcolor: user.profilePicture ? 'transparent' : 'primary.main' }}
                  >
                    {user.firstName ? user.firstName.charAt(0).toUpperCase() : '?'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle2" fontWeight="bold">
                        {`${user.firstName} ${user.lastName || ''}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTimestamp(lastMessage.createdAt)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '180px'
                        }}
                      >
                        {lastMessage.content}
                      </Typography>
                      {count > 1 && (
                        <Badge 
                          badgeContent={count} 
                          color="primary" 
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  }
                />
              </MenuItem>
            );
          })
        ) : (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
              No new messages
            </Typography>
          </MenuItem>
        )}
        
        <Divider />
        
        <MenuItem onClick={() => navigate('/messages')} sx={{ justifyContent: 'center' }}>
          <Typography variant="body2" color="primary">
            View All Messages
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MessageNotifications;
