import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  Typography, 
  Divider, 
  CircularProgress, 
  Box,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
  borderRadius: '8px',
  marginBottom: '8px',
  backgroundColor: selected ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  cursor: 'pointer'
}));

const ChatList = ({ chats, loading, error, onSelectChat, selectedChat }) => {
  const { userProfile } = useSelector(state => state.auth);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Error loading chats: {error}</Typography>
      </Box>
    );
  }

  if (!chats || chats.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary', mt: 4 }}>
        <Typography variant="body1">No conversations yet</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Start a chat with your followers using the "New Chat" button
        </Typography>
      </Box>
    );
  }

  // Function to get the other user in a chat (not the current user)
  const getOtherUser = (chat) => {
    if (!chat.users || !Array.isArray(chat.users) || chat.users.length === 0) {
      return { firstName: 'Unknown', lastName: 'User' };
    }
    
    // Find the user that is not the current user
    if (userProfile) {
      const otherUser = chat.users.find(u => u.id !== userProfile.id);
      if (otherUser) return otherUser;
    }
    
    // Fallback to first user if we can't determine the other user
    return chat.users[0];
  };

  // Function to get the last message in a chat
  const getLastMessage = (chat) => {
    if (chat.messages && Array.isArray(chat.messages) && chat.messages.length > 0) {
      const lastMsg = chat.messages[chat.messages.length - 1];
      return {
        content: lastMsg.content,
        timestamp: lastMsg.timestamp || lastMsg.createdAt
      };
    }
    return { content: "No messages yet", timestamp: null };
  };

  // Format timestamp to a readable format
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    const now = new Date();
    
    // If the message is from today, show only time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If the message is from this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    // Otherwise show full date
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
        Conversations
      </Typography>
      <Divider />
      <List sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 170px)', p: 1 }}>
        {chats.map((chat) => {
          const otherUser = getOtherUser(chat);
          const lastMessage = getLastMessage(chat);
          const isSelected = selectedChat && selectedChat.id === chat.id;
          
          return (
            <React.Fragment key={chat.id}>
              <StyledListItem 
                onClick={() => onSelectChat(chat)}
                selected={isSelected}
                sx={{ 
                  backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                  p: 1
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color="success"
                    invisible={!chat.unreadCount} // Only show badge if there are unread messages
                  >
                    <Avatar 
                      alt={otherUser.firstName} 
                      src={otherUser.image || '/static/images/avatar/1.jpg'} 
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'medium' }}>
                        {`${otherUser.firstName} ${otherUser.lastName || ''}`}
                      </Typography>
                      {lastMessage.timestamp && (
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(lastMessage.timestamp)}
                        </Typography>
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      noWrap
                      sx={{ 
                        fontWeight: chat.unreadCount ? 'bold' : 'normal',
                        color: chat.unreadCount ? 'text.primary' : 'text.secondary'
                      }}
                    >
                      {lastMessage.content}
                    </Typography>
                  }
                />
              </StyledListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default ChatList;
