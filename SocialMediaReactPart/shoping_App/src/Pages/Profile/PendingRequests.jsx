import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getPendingRequestsAction, 
  acceptFollowRequestAction, 
  rejectFollowRequestAction 
} from '../../redux/User/user.action';
import { 
  Avatar, 
  Button, 
  Card, 
  CircularProgress, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Typography,
  Alert,
  Box,
  Container,
  Paper,
  Snackbar,
  Divider
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const ActionButton = styled(Button)(({ theme, color }) => ({
  borderRadius: '4px',
  textTransform: 'none',
  fontSize: '12px',
  padding: '4px 10px',
  minWidth: 'auto',
}));

const PendingRequests = () => {
  const dispatch = useDispatch();
  const { pendingRequests, loading, acceptRequestSuccess, rejectRequestSuccess } = useSelector(state => state.user);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [localPendingRequests, setLocalPendingRequests] = useState([]);
  const [processedRequests, setProcessedRequests] = useState(new Set());
  
  // Initialize local state with redux state
  useEffect(() => {
    if (pendingRequests && pendingRequests.length > 0) {
      setLocalPendingRequests(pendingRequests.filter(req => !processedRequests.has(req.id)));
    }
  }, [pendingRequests, processedRequests]);
  
  useEffect(() => {
    console.log("Fetching pending requests");
    dispatch(getPendingRequestsAction());
  }, [dispatch]);
  
  useEffect(() => {
    if (acceptRequestSuccess) {
      setSnackbarMessage('Follow request accepted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  }, [acceptRequestSuccess]);
  
  useEffect(() => {
    if (rejectRequestSuccess) {
      setSnackbarMessage('Follow request rejected');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
    }
  }, [rejectRequestSuccess]);
  
  const handleAcceptRequest = (requesterId) => {
    console.log("Accepting request from user ID:", requesterId);
    // Update local state immediately for better UX
    setLocalPendingRequests(prev => prev.filter(req => req.id !== requesterId));
    // Track processed requests to prevent them from reappearing
    setProcessedRequests(prev => new Set(prev).add(requesterId));
    // Dispatch the action to update backend
    dispatch(acceptFollowRequestAction(requesterId));
  };
  
  const handleRejectRequest = (requesterId) => {
    console.log("Rejecting request from user ID:", requesterId);
    // Update local state immediately for better UX
    setLocalPendingRequests(prev => prev.filter(req => req.id !== requesterId));
    // Track processed requests to prevent them from reappearing
    setProcessedRequests(prev => new Set(prev).add(requesterId));
    // Dispatch the action to update backend
    dispatch(rejectFollowRequestAction(requesterId));
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  console.log("Pending requests:", localPendingRequests);
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={1} sx={{ p: 3, borderRadius: '8px' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Follow Requests
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : !localPendingRequests || localPendingRequests.length === 0 ? (
          <Alert severity="info" sx={{ mb: 3 }}>
            No pending follow requests
          </Alert>
        ) : (
          <List sx={{ p: 0 }}>
            {localPendingRequests.map(request => (
              <ListItem
                key={request.id}
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
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <ActionButton
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<CheckIcon />}
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      Accept
                    </ActionButton>
                    <ActionButton
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<CloseIcon />}
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      Reject
                    </ActionButton>
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#f44336' }}>
                    {request.firstName?.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="medium">
                      {request.firstName} {request.lastName}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {request.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        @{request.firstName.toLowerCase() + request.id}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PendingRequests;
