import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, 
  Typography, 
  TextField, 
  IconButton, 
  Avatar, 
  CircularProgress,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { createMessageAction, getMessagesAction, markMessagesAsRead } from '../ChatReducer/Chat.action';

const MessageContainer = styled(Box)(({ theme, isCurrentUser }) => ({
  display: 'flex',
  justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
}));

const MessageBubble = styled(Paper)(({ theme, isCurrentUser }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(2),
  backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.grey[200],
  color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  maxWidth: '100%',
  wordBreak: 'break-word',
}));

const ChatBox = ({ selectedChat }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  // Get user profile from Redux store
  const userProfile = useSelector(state => state.auth.userProfile);
  
  // Get messages from Redux store
  const messagesObj = useSelector(state => state.chat.messages || {});
  const messageLoading = useSelector(state => state.chat.messageLoading);
  
  // Get the messages for the current chat
  const chatMessages = selectedChat && messagesObj[selectedChat.id] ? messagesObj[selectedChat.id] : [];

  // Debug logs to help troubleshoot message display issues
  useEffect(() => {
    if (selectedChat) {
      console.log('Selected Chat:', selectedChat);
      console.log('Messages Object:', messagesObj);
      console.log('Chat Messages:', chatMessages);
    }
  }, [selectedChat, messagesObj, chatMessages]);

  useEffect(() => {
    if (selectedChat) {
      console.log('Loading messages for chat:', selectedChat.id);
      dispatch(getMessagesAction(selectedChat.id));
      
      // Mark messages as read when a chat is selected
      dispatch(markMessagesAsRead(selectedChat.id));
      
      // Set up an interval to periodically refresh messages
      const intervalId = setInterval(() => {
        console.log('Refreshing messages for chat:', selectedChat.id);
        dispatch(getMessagesAction(selectedChat.id));
        // Also mark messages as read on each refresh
        dispatch(markMessagesAsRead(selectedChat.id));
      }, 10000); // Refresh every 10 seconds
      
      // Clean up the interval when the component unmounts or selectedChat changes
      return () => clearInterval(intervalId);
    }
  }, [selectedChat, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (message.trim() && selectedChat) {
      try {
        console.log('Sending message to chat:', selectedChat.id, 'Content:', message);
        
        // Dispatch the action to create a new message
        await dispatch(createMessageAction(selectedChat.id, message));
        
        // Clear the input field
        setMessage('');
        
        // Scroll to the bottom of the chat
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        // Display an error notification
        setSnackbar({
          open: true,
          message: 'Failed to send message. Please try again.',
          severity: 'error'
        });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedChat) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          bgcolor: 'background.paper',
          borderRadius: 1,
          p: 2
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select a chat to start messaging
        </Typography>
      </Box>
    );
  }

  const otherUser = selectedChat.users?.find(user => user.id !== userProfile?.id) || {};

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        overflow: 'hidden'
      }}
    >
      {/* Chat Header */}
      <Box 
        sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Avatar 
          src={otherUser?.image || '/static/images/avatar/1.jpg'} 
          alt={otherUser?.firstName || 'User'}
          sx={{ mr: 2 }}
        />
        <Typography variant="h6">
          {otherUser?.firstName ? `${otherUser.firstName} ${otherUser.lastName || ''}` : 'User'}
        </Typography>
      </Box>
      
      {/* Chat Messages */}
      <Box 
        sx={{ 
          p: 2, 
          flexGrow: 1, 
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {messageLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : chatMessages && chatMessages.length > 0 ? (
          chatMessages.map((msg) => {
            // Debug log for each message
            console.log('Rendering message:', msg);
            
            // Determine if the message is from the current user
            const isCurrentUser = msg.user?.id === userProfile?.id || 
                                 msg.sender?.id === userProfile?.id || 
                                 msg.userId === userProfile?.id;
            
            // Get the user info from the message
            const messageUser = msg.user || msg.sender || { id: msg.userId };
            
            return (
              <MessageContainer 
                key={msg.id} 
                isCurrentUser={isCurrentUser}
              >
                {!isCurrentUser && (
                  <Avatar 
                    src={(messageUser?.image) || '/static/images/avatar/1.jpg'} 
                    alt={messageUser?.firstName || 'User'}
                    sx={{ mr: 1, width: 32, height: 32 }}
                  />
                )}
                <Box sx={{ maxWidth: '70%' }}>
                  <MessageBubble isCurrentUser={isCurrentUser}>
                    <Typography variant="body1">{msg.content}</Typography>
                  </MessageBubble>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ 
                      display: 'block', 
                      textAlign: isCurrentUser ? 'right' : 'left',
                      mt: 0.5
                    }}
                  >
                    {new Date(msg.timestamp || msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
                {isCurrentUser && (
                  <Avatar 
                    src={userProfile?.image || '/static/images/avatar/1.jpg'} 
                    alt={userProfile?.firstName || 'You'}
                    sx={{ ml: 1, width: 32, height: 32 }}
                  />
                )}
              </MessageContainer>
            );
          })
        ) : (
          <Box sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
            <Typography variant="body1">No messages yet</Typography>
            <Typography variant="body2">Send a message to start the conversation</Typography>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>
      
      {/* Message Input */}
      <Box 
        sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ mr: 1 }}
        />
        <IconButton 
          color="primary" 
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatBox;
