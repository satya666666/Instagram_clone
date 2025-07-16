import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  Box,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { createChatAction } from '../ChatReducer/Chat.action';
import { searchUserAction, getFollowersAction } from '../../redux/User/user.action';

const NewChatDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const { userProfile } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.chat);
  const { users, followers, followersLoading, followersError } = useSelector(state => state.user);

  // Load followers when dialog opens
  useEffect(() => {
    if (open) {
      dispatch(getFollowersAction());
    }
  }, [open, dispatch]);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setSearching(true);
      const timeoutId = setTimeout(() => {
        dispatch(searchUserAction(searchTerm))
          .then(() => {
            setSearching(false);
          })
          .catch(error => {
            console.error('Error searching users:', error);
            setSearching(false);
          });
      }, 500);
      
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, dispatch]);

  // Update search results when users state changes
  useEffect(() => {
    if (users && users.length > 0 && userProfile) {
      // Filter out the current user
      const filteredResults = users.filter(u => u.id !== userProfile.id);
      setSearchResults(filteredResults);
    }
  }, [users, userProfile]);

  const handleStartChat = (userId) => {
    dispatch(createChatAction(userId))
      .then(() => {
        onClose();
      })
      .catch(error => {
        console.error('Error creating chat:', error);
      });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Clear search when switching to followers tab
    if (newValue === 0) {
      setSearchTerm('');
    }
  };

  // Render user list item
  const renderUserItem = (user) => (
    <ListItem 
      button 
      key={user.id} 
      onClick={() => handleStartChat(user.id)}
      sx={{ 
        borderRadius: '8px', 
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
        mb: 1
      }}
    >
      <ListItemAvatar>
        <Avatar 
          src={user.image || '/static/images/avatar/1.jpg'} 
          alt={user.firstName}
        >
          {!user.image && user.firstName ? user.firstName[0] : <PersonIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText 
        primary={
          <Typography variant="subtitle2">
            {`${user.firstName || ''} ${user.lastName || ''}`}
          </Typography>
        } 
        secondary={
          <Typography variant="body2" color="text.secondary">
            {user.username || `@${user.firstName?.toLowerCase() || ''}${user.id}`}
          </Typography>
        } 
      />
    </ListItem>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Start a New Conversation</DialogTitle>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Followers" />
        <Tab label="Search Users" />
      </Tabs>
      <DialogContent>
        {tabValue === 0 ? (
          // Followers Tab
          <>
            {followersLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress size={30} />
              </Box>
            ) : followersError ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="error">
                  Error loading followers: {followersError}
                </Typography>
              </Box>
            ) : followers && followers.length > 0 ? (
              <List sx={{ pt: 1 }}>
                {followers.map(user => renderUserItem(user))}
              </List>
            ) : (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  You don't have any followers yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  When people follow you, they'll appear here
                </Typography>
              </Box>
            )}
          </>
        ) : (
          // Search Tab
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Search users"
              type="text"
              fullWidth
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searching && (
                  <InputAdornment position="end">
                    <CircularProgress size={20} />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            {searchTerm.trim().length > 0 && !searching && (
              <List>
                {searchResults.length > 0 ? (
                  searchResults.map(user => renderUserItem(user))
                ) : (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No users found matching "{searchTerm}"
                    </Typography>
                  </Box>
                )}
              </List>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewChatDialog;
