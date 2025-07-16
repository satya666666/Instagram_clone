import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from '@mui/material';
import { getUnreadMessagesCount } from '../ChatReducer/Chat.action';

const UnreadMessageBadge = ({ children }) => {
  const dispatch = useDispatch();
  const [unreadCount, setUnreadCount] = useState(0);
  const unreadMessages = useSelector(state => state.chat.unreadMessages || {});
  
  useEffect(() => {
    // Calculate total unread messages
    const totalUnread = Object.values(unreadMessages).reduce((total, count) => total + count, 0);
    setUnreadCount(totalUnread);
  }, [unreadMessages]);
  
  useEffect(() => {
    // Fetch unread messages count on component mount
    const fetchUnreadCount = async () => {
      await dispatch(getUnreadMessagesCount());
    };
    
    fetchUnreadCount();
    
    // Set up an interval to periodically refresh unread count
    const intervalId = setInterval(() => {
      fetchUnreadCount();
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [dispatch]);
  
  return (
    <Badge 
      badgeContent={unreadCount} 
      color="error"
      max={99}
      overlap="circular"
      sx={{
        '& .MuiBadge-badge': {
          right: -3,
          top: 3,
          border: '2px solid #fff',
          padding: '0 4px',
        },
      }}
    >
      {children}
    </Badge>
  );
};

export default UnreadMessageBadge;
