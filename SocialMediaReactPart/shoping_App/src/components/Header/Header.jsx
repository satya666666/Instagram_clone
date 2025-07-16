import React, { useState, useRef, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  InputBase, 
  Badge, 
  Avatar,
  Box,
  Popover,
  Paper
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/Auth/auth.action';
import { getUnreadMessagesCount } from '../../Pages/ChatReducer/Chat.action';
import { searchUserAction } from '../../redux/User/user.action';
import UserSuggestions from '../UserSuggestions/UserSuggestions';
import MessageNotifications from '../../Pages/Chat/MessageNotifications';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.auth);
  const { chats } = useSelector(state => state.chat);
  const unreadMessagesObj = useSelector(state => state.chat.unreadMessages || {});
  const searchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  
  // Calculate total unread messages from all chats
  const totalUnreadMessages = Object.values(unreadMessagesObj).reduce((total, count) => total + count, 0);
  
  // Fetch unread messages count when component mounts
  useEffect(() => {
    dispatch(getUnreadMessagesCount());
  }, [dispatch]);
  
  const handleSearchClick = () => {
    setSuggestionsOpen(true);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim().length > 0) {
      dispatch(searchUserAction(e.target.value));
    }
  };
  
  const handleCloseSuggestions = () => {
    setSuggestionsOpen(false);
  };
  
  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  const handlePendingRequestsClick = () => {
    navigate('/profile');
    // We'll set the tab to 'requests' in the profile page
  };
  
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1877f2' }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' }, 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.5rem'
            }}
            onClick={() => navigate('/')}
          >
            MOJO
          </Typography>
          
          <Search ref={searchRef}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search User..."
              inputProps={{ 'aria-label': 'search' }}
              onClick={handleSearchClick}
              onChange={handleSearchChange}
              value={searchQuery}
            />
          </Search>
          
          <div style={{ flexGrow: 1 }} />
          
          <Button 
            color="inherit" 
            startIcon={<SearchIcon />}
            onClick={() => navigate('/search')}
            sx={{ 
              borderRadius: '4px',
              textTransform: 'none',
              fontWeight: 'medium',
              mr: 1
            }}
          >
            FIND USERS
          </Button>
          
          {userProfile && (
            <>
              <IconButton
                size="large"
                color="inherit"
                onClick={handlePendingRequestsClick}
                sx={{ mr: 1 }}
              >
                <Badge badgeContent={userProfile?.pendingFollowRequests?.length || 0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              
              <MessageNotifications />
              
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleProfileClick}
              >
                <Avatar 
                  alt={userProfile?.firstName} 
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 32, height: 32 }}
                >
                  {userProfile?.firstName?.charAt(0)}
                </Avatar>
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      
      <UserSuggestions 
        anchorEl={searchRef.current}
        open={suggestionsOpen}
        onClose={handleCloseSuggestions}
      />
    </>
  );
};

export default Header;
