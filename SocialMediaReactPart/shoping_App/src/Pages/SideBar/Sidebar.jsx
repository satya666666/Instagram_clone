import React, { useState, useEffect } from "react";

import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Button, Card, Divider, Menu, MenuItem, Badge, ListItemAvatar, ListItemText, Typography, Box } from "@mui/material";
import profileImage from '../../assets/MT2024123.jpeg'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/Auth/auth.action";
import { getUnreadMessagesCount, markMessagesAsRead } from "../ChatReducer/Chat.action";

const Sidebar = () => {
    const navigator = useNavigate();
    const user = useSelector((state) => state.auth.userProfile);
    const { chats } = useSelector((state) => state.chat);
    const unreadMessagesObj = useSelector((state) => state.chat.unreadMessages || {});
    const unreadMessagesByUser = useSelector((state) => state.chat.unreadMessagesByUser || {});
    const dispatch = useDispatch();
    
    // Calculate total unread messages from all chats
    const totalUnreadMessages = Object.values(unreadMessagesObj).reduce((total, count) => total + count, 0);
    
    // Fetch unread messages count when component mounts
    useEffect(() => {
        dispatch(getUnreadMessagesCount());
        
        // Set up interval to refresh unread count periodically
        const intervalId = setInterval(() => {
            dispatch(getUnreadMessagesCount());
        }, 30000); // Check every 30 seconds
        
        return () => clearInterval(intervalId);
    }, [dispatch]);
    
    // Handle clicking on a user message notification
    const handleMessageNotificationClick = (chatId, userId) => {
        // Mark messages from this user as read
        dispatch(markMessagesAsRead(chatId));
        
        // Navigate to the chat
        navigator(`/messages?chatId=${chatId}`);
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
    
    // Create a custom Messages icon with dropdown for user notifications
    const [messagesAnchorEl, setMessagesAnchorEl] = useState(null);
    
    const handleMessagesClick = (event) => {
        if (Object.keys(unreadMessagesByUser).length > 0) {
            setMessagesAnchorEl(event.currentTarget);
        } else {
            navigator('/messages');
        }
    };
    
    const handleMessagesClose = () => {
        setMessagesAnchorEl(null);
    };
    
    const MessagesIcon = () => (
        <>
            <Badge badgeContent={totalUnreadMessages} color="error" max={99}>
                <MessageIcon />
            </Badge>
            
            <Menu
                anchorEl={messagesAnchorEl}
                open={Boolean(messagesAnchorEl)}
                onClose={handleMessagesClose}
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
                                onClick={() => {
                                    handleMessageNotificationClick(lastMessage.chat.id, userId);
                                    handleMessagesClose();
                                }}
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
                
                <MenuItem onClick={() => {
                    navigator('/messages');
                    handleMessagesClose();
                }} sx={{ justifyContent: 'center' }}>
                    <Typography variant="body2" color="primary">
                        View All Messages
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
    
    const SideBarNav = [
        { title: 'Home', icon: <HomeIcon />, path: '/' },
        { title: 'Reels', icon: <ExploreIcon />, path: '/reels' },
        { title: 'Create Reels', icon: <ControlPointIcon />, path: '/create-reels' },
        { title: 'Search', icon: <SearchIcon />, path: '/search' },
        { title: 'Notifications', icon: <CircleNotificationsIcon />, path: '/notifications' },
        { 
            title: 'Messages', 
            icon: <MessagesIcon />, 
            path: '/messages',
            onClick: handleMessagesClick
        },
        { title: 'Lists', icon: <ListAltIcon />, path: '/lists' },
        { title: 'Communities', icon: <GroupIcon />, path: '/communities' },
        { title: 'Profile', icon: <AccountCircleIcon />, path: '/profile' }
    ];
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    console.log("User Profile:", user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (item) => {
        if (item.title === "Profile") {
            navigator(`/profile/${user?.id}`)
        }
        else if(item.onClick){
            item.onClick()
        }else navigator(`${item.path}`)

    }
    const handleLogout = () => {
        dispatch(logoutAction());
        navigator('/login');
    }
    return (
        <Card className="bg-slate-500  card h-screen flex flex-col justify-between py-5 overflow-hidden">
            <div className="space-y-8 pl-5">
                <div>
                    <span className="logo text-emerald-800 text-center text-4xl font-serif italic font-bold tracking-wide">
                        MOJO
                    </span>
                </div>
                <div className="space-y-8">
                    {SideBarNav.map((items, index) => (
                        <div key={index} onClick={() => { handleNavigate(items) }} className="cursor-pointer flex space-x-3 items-center">
                            {items.icon}
                            <p className="text-xl">{items.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <Divider></Divider>
                <div className="pl-5  felx items-center justify-between pt-5">
                    <div className="flex items-center space-x-3">
                        <Avatar src={profileImage}></Avatar>
                        <div className="flex flex-col justify-between ml-auto">
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}


                            >
                                <MoreVertIcon color="black"></MoreVertIcon>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose} >Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>

                    </div>
                    <p className="font-bold">{user?.firstName + " " + user?.lastName || "Loading..."}</p>


                    <p>@{user?.firstName + "_" + user?.lastName || "Loading..."}</p>

                </div>
            </div>
        </Card>
    );
};

export default Sidebar;
