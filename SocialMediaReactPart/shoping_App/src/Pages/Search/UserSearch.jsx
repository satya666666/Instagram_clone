import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction, sendFollowRequestAction } from '../../redux/User/user.action';
import { 
  Avatar, 
  Button, 
  Card, 
  CircularProgress, 
  Divider, 
  InputAdornment, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  TextField, 
  Typography,
  Box,
  Paper,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
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

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, sendRequestSuccess } = useSelector(state => state.user);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const timeoutId = setTimeout(() => {
        dispatch(searchUserAction(searchQuery));
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, searchQuery]);
  
  useEffect(() => {
    if (sendRequestSuccess) {
      setSnackbarMessage('Follow request sent successfully!');
      setSnackbarOpen(true);
    }
  }, [sendRequestSuccess]);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSendFollowRequest = (userId) => {
    console.log("Sending follow request to user ID:", userId);
    dispatch(sendFollowRequestAction(userId));
  };
  
  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  // Check if the current user has sent a follow request to this user
  const hasSentRequest = (targetUser) => {
    if (!user || !targetUser) return false;
    
    // Check if the current user's ID is in the target user's pending follow requests
    if (targetUser.pendingFollowRequests && Array.isArray(targetUser.pendingFollowRequests)) {
      return targetUser.pendingFollowRequests.some(id => id === user.id);
    }
    
    // Or check if the target user's ID is in the current user's sent follow requests
    if (user.sentFollowRequests && Array.isArray(user.sentFollowRequests)) {
      return user.sentFollowRequests.some(id => id === targetUser.id);
    }
    
    return false;
  };
  
  // Check if the current user is following this user
  const isFollowing = (targetUser) => {
    if (!user || !targetUser) return false;
    
    // Check if the current user's ID is in the target user's followers
    if (targetUser.followers && Array.isArray(targetUser.followers)) {
      return targetUser.followers.some(id => id === user.id);
    }
    
    // Or check if the target user's ID is in the current user's followings
    if (user.followings && Array.isArray(user.followings)) {
      return user.followings.some(id => id === targetUser.id);
    }
    
    return false;
  };
  
  console.log("Current user:", user);
  console.log("Search results:", users);
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={1} sx={{ p: 3, borderRadius: '8px' }}>
        <Typography variant="h5" fontWeight="bold" className="mb-4">
          Find Users
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '20px',
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
            }
          }}
          sx={{ mb: 3 }}
        />
        
        <Divider sx={{ mb: 3 }} />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : users && users.length > 0 ? (
          <List sx={{ p: 0 }}>
            {users.map(userItem => (
              <ListItem
                key={userItem.id}
                sx={{ 
                  py: 2, 
                  px: 2, 
                  borderRadius: '8px',
                  mb: 1,
                  '&:hover': { 
                    bgcolor: 'rgba(0, 0, 0, 0.04)' 
                  }
                }}
                secondaryAction={
                  user && user.id !== userItem.id && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleViewProfile(userItem.id)}
                        sx={{ 
                          borderRadius: '4px',
                          textTransform: 'none'
                        }}
                      >
                        View
                      </Button>
                      {isFollowing(userItem) ? (
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
                      )}
                    </Box>
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar 
                    onClick={() => handleViewProfile(userItem.id)} 
                    style={{ cursor: 'pointer', bgcolor: '#f44336' }}
                  >
                    {userItem.firstName?.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="medium" sx={{ cursor: 'pointer' }} onClick={() => handleViewProfile(userItem.id)}>
                      {userItem.firstName} {userItem.lastName}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {userItem.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        @{userItem.firstName.toLowerCase() + userItem.id}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : searchQuery.trim().length > 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No users found matching "{searchQuery}"
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Type a name to search for users
            </Typography>
          </Box>
        )}
      </Paper>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserSearch;
