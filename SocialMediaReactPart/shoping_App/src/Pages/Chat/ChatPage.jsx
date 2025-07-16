import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChatsAction } from '../ChatReducer/Chat.action';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import NewChatDialog from './NewChatDialog';
import { Box, Grid, Paper, Button, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 'calc(100vh - 100px)',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
}));

const ChatPage = () => {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chat);
  const [selectedChat, setSelectedChat] = useState(null);
  const [openNewChatDialog, setOpenNewChatDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showChatList, setShowChatList] = useState(true);

  // Load chats when the component mounts
  useEffect(() => {
    dispatch(getAllChatsAction());
  }, [dispatch]);

  // Select the first chat by default when chats are loaded
  useEffect(() => {
    if (chats && chats.length > 0 && !selectedChat) {
      setSelectedChat(chats[0]);
    }
  }, [chats, selectedChat]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    if (isMobile) {
      setShowChatList(false);
    }
  };

  const handleBackToList = () => {
    setShowChatList(true);
  };

  const handleNewChatClose = () => {
    setOpenNewChatDialog(false);
    // Refresh the chat list after creating a new chat
    dispatch(getAllChatsAction());
  };

  return (
    <Box sx={{ flexGrow: 1, padding: { xs: 1, sm: 2, md: 3 } }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', pl: { xs: 1, sm: 0 } }}>
        Messages
      </Typography>
      
      <Grid container spacing={2}>
        {/* Chat List - Hidden on mobile when a chat is selected */}
        {(!isMobile || (isMobile && showChatList)) && (
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Conversations</Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => setOpenNewChatDialog(true)}
                size={isMobile ? "small" : "medium"}
              >
                New Chat
              </Button>
            </Box>
            <StyledPaper>
              <ChatList 
                chats={chats || []} 
                loading={loading} 
                error={error}
                onSelectChat={handleSelectChat}
                selectedChat={selectedChat}
              />
            </StyledPaper>
          </Grid>
        )}
        
        {/* Chat Box - Full width on mobile when a chat is selected */}
        {(!isMobile || (isMobile && !showChatList)) && (
          <Grid item xs={12} md={8}>
            <StyledPaper>
              {isMobile && !showChatList && selectedChat && (
                <Button 
                  onClick={handleBackToList}
                  sx={{ mb: 1 }}
                >
                  ← Back to chats
                </Button>
              )}
              <ChatBox 
                selectedChat={selectedChat} 
              />
            </StyledPaper>
          </Grid>
        )}
      </Grid>
      
      {/* New Chat Dialog */}
      <NewChatDialog 
        open={openNewChatDialog} 
        onClose={handleNewChatClose} 
      />
    </Box>
  );
};

export default ChatPage;
