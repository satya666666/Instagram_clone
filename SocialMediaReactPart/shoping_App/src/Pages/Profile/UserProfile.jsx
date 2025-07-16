import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar, Button, Card, CircularProgress, Divider, Typography } from '@mui/material';
import {
  getUserProfileAction,
  followUserAction,
  unfollowUserAction,
  sendFollowRequestAction
} from '../../redux/User/user.action';

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userProfile, loading, followSuccess, unfollowSuccess, sendRequestSuccess } = useSelector(state => state.user);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (userId) {
      dispatch(getUserProfileAction(userId));
    }
  }, [dispatch, userId, followSuccess, unfollowSuccess, sendRequestSuccess]);
  
  const handleFollowUser = () => {
    dispatch(followUserAction(userId));
  };
  
  const handleUnfollowUser = () => {
    dispatch(unfollowUserAction(userId));
  };
  
  const handleSendFollowRequest = () => {
    dispatch(sendFollowRequestAction(userId));
  };
  
  // Check if current user is following this profile
  const isFollowing = () => {
    if (!userProfile || !user) return false;
    return userProfile.followers && userProfile.followers.includes(user.id);
  };
  
  // Check if current user has sent a follow request to this profile
  const hasSentRequest = () => {
    if (!userProfile || !user) return false;
    return userProfile.pendingFollowRequests && userProfile.pendingFollowRequests.includes(user.id);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }
  
  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6">User not found</Typography>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <Card className="p-5">
        <div className="flex flex-col items-center">
          <Avatar
            sx={{ width: 150, height: 150, mb: 2 }}
            src={userProfile.profileImage}
          >
            {userProfile.firstName?.charAt(0)}
          </Avatar>
          
          <Typography variant="h4" className="mb-1">
            {userProfile.firstName} {userProfile.lastName}
          </Typography>
          
          <Typography variant="body1" color="textSecondary" className="mb-4">
            {userProfile.email}
          </Typography>
          
          {user && user.id !== parseInt(userId) && (
            <div className="mb-4">
              {isFollowing() ? (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleUnfollowUser}
                  disabled={loading}
                >
                  Unfollow
                </Button>
              ) : hasSentRequest() ? (
                <Button
                  variant="outlined"
                  color="primary"
                  disabled
                >
                  Request Sent
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendFollowRequest}
                  disabled={loading}
                >
                  Follow
                </Button>
              )}
            </div>
          )}
        </div>
        
        <Divider className="my-4" />
        
        <div className="flex justify-around text-center">
          <div>
            <Typography variant="h6">{userProfile.followers?.length || 0}</Typography>
            <Typography variant="body2" color="textSecondary">Followers</Typography>
          </div>
          <div>
            <Typography variant="h6">{userProfile.followings?.length || 0}</Typography>
            <Typography variant="body2" color="textSecondary">Following</Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
