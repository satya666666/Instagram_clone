import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, Box, Button, Card, Divider, Tab, Tabs, Grid, Typography, CircularProgress } from '@mui/material'
import PostCard from '../Post/PostCard'
import UserReelsCaard from '../UserReels/UserReelsCaard'
import { useSelector, useDispatch } from 'react-redux'
import ProfileModel from '../ProfileModel/ProfileModel'
import PendingRequests from './PendingRequests'
import { getUserProfileAction, sendFollowRequestAction, followUserAction, unfollowUserAction } from '../../redux/User/user.action'
import { getCurrentUserPostsAction, getUserPost, getSavedPostsAction } from '../PostReducer/Post.action'
import UserReels from '../Reels/UserReels'
import SavedReels from '../Reels/SavedReels'
import { getSavedReelsAction } from '../ReelsReducer/Reels.action'

const Profile = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { userProfile, loading, sendRequestSuccess } = useSelector(state => state.user);
    const { posts, savedPosts, savedReels, loading: postsLoading } = useSelector(state => state.post);
    const authUser = useSelector((state) => state.auth.userProfile);
    const [value, setValue] = useState('posts'); 
    const [savedTabValue, setSavedTabValue] = useState('posts');
    const Navigate = useNavigate();

    const isCurrentUserProfile = !id || (authUser && authUser.id === parseInt(id));
    const displayUser = userProfile || authUser;

    const [open, setOpen] = React.useState(false);
    const handleOpenProfileModel = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (id) {
            dispatch(getUserProfileAction(id));
            dispatch(getUserPost(id));
        } else if (authUser) {
            dispatch(getCurrentUserPostsAction());
            dispatch(getSavedPostsAction());
        }
    }, [dispatch, id, authUser, sendRequestSuccess]);

    useEffect(() => {
        if (value === 'saved' && isCurrentUserProfile) {
            if (savedTabValue === 'posts') {
                dispatch(getSavedPostsAction());
            } else if (savedTabValue === 'reels') {
                dispatch(getSavedReelsAction());
            }
        }
    }, [value, savedTabValue, dispatch, isCurrentUserProfile]);

    const isFollowing = authUser?.followings?.includes(parseInt(id));
    const hasPendingRequest = authUser?.sentFollowRequests?.includes(parseInt(id));

    const handleFollowAction = () => {
        if (isFollowing) {
            dispatch(unfollowUserAction(id));
        } else if (hasPendingRequest) {
            console.log("Request already sent");
        } else {
            dispatch(sendFollowRequestAction(id));
        }
    };

    const getFollowButtonText = () => {
        if (isFollowing) return "Unfollow";
        if (hasPendingRequest) return "Request Sent";
        return "Follow";
    };

    const getFollowButtonColor = () => {
        if (isFollowing) return "error";
        return "primary";
    };

    const getFollowButtonVariant = () => {
        if (isFollowing) return "outlined";
        if (hasPendingRequest) return "outlined";
        return "contained";
    };

    const reels = [1, 1, 1, 1, 1]
    const repostPost = [1, 1, 1, 1, 1]
    const profileData = [
        {
            value: 'posts',
            label: 'Posts'
        },
        {
            value: 'reels',
            label: 'Reels'
        },
        {
            value: 'saved',
            label: 'Saved'
        },
        {
            value: 'repost',
            label: 'Repost'
        },
        ...(isCurrentUserProfile ? [{
            value: 'requests',
            label: 'Follow Requests'
        }] : [])
    ]
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSavedTabChange = (event, newValue) => {
        setSavedTabValue(newValue);
    };

    return (
        <div className='py-10 w-[70%]'>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card className="rrounde-t-md">
                        <div className="h-[15rem]">
                            <img className='w-full h-full rounded-t-md' src="https://cdn.pixabay.com/photo/2023/07/17/09/25/tree-8132250_1280.jpg" alt="" />
                        </div>
                        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
                            <Avatar className='transform -translate-y-18' sx={{ width: '6rem', height: '6rem' }}
                                src={displayUser?.image || "https://cdn.pixabay.com/photo/2022/05/24/06/23/indian-face-7217717_640.jpg"}
                            >
                                {displayUser?.firstName?.charAt(0)}
                            </Avatar>
                            {loading ? (
                                <CircularProgress size={24} />
                            ) : isCurrentUserProfile ? (
                                <Button 
                                    sx={{ borderRadius: '20px' }} 
                                    variant='contained' 
                                    color='primary' 
                                    onClick={handleOpenProfileModel}
                                >
                                    Edit Profile
                                </Button> 
                            ) : (
                                <Button 
                                    sx={{ borderRadius: '20px' }} 
                                    variant={getFollowButtonVariant()} 
                                    color={getFollowButtonColor()}
                                    onClick={handleFollowAction}
                                    disabled={hasPendingRequest}
                                >
                                    {getFollowButtonText()}
                                </Button>
                            )}
                        </div>

                        <div className="p-5 py-1">
                            <div>
                                <h1 className='py-1 font-bold text-xl'>{displayUser?.firstName + " " + displayUser?.lastName}</h1>
                                <p>@{displayUser?.firstName?.toLowerCase() + "_" + (displayUser?.id || 9939)}</p>
                            </div>
                            <div className="flex gap-5 items-center py-3">
                                <span>{posts?.length || 0} posts</span>
                                <span>{displayUser?.followers?.length || 0} followers</span>
                                <span>{displayUser?.followings?.length || 0} followings</span>
                            </div>
                            <div>
                                <h4>About</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, optio.
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, rerum.
                                </p>
                            </div>
                        </div>

                        <section>
                            <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="wrapped label tabs example"
                                >
                                    {profileData.map((item, index) => <Tab key={index} value={item.value} label={item.label} />)}
                                </Tabs>
                            </Box>


                            <div className="flex justify-center">
                                {value === "posts" ? (
                                    <div className='space-y-5 w-[70%] my-10'>
                                        {postsLoading ? (
                                            <div className="flex justify-center my-5">
                                                <CircularProgress />
                                            </div>
                                        ) : posts && posts.length > 0 ? (
                                            posts.map((post, index) => (
                                                <div key={index} className='border border-slate-500 rounded-md'>
                                                    <PostCard item={post} />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center my-5">
                                                <Typography variant="body1">No posts yet</Typography>
                                            </div>
                                        )}
                                    </div>
                                ) : value === 'reels' ? (
                                    <div className='w-full my-5'>
                                        <UserReels userId={id} />
                                    </div>
                                ) : value === "saved" ? (
                                    <div className='w-full my-5'>
                                        {value === "saved" && isCurrentUserProfile && (
                                            <Tabs value={savedTabValue} onChange={handleSavedTabChange} className="mb-4">
                                                <Tab value="posts" label="Posts" />
                                                <Tab value="reels" label="Reels" />
                                            </Tabs>
                                        )}
                                        
                                        {savedTabValue === "posts" ? (
                                            <div className='space-y-5 w-[70%] mx-auto'>
                                                {postsLoading ? (
                                                    <div className="flex justify-center my-5">
                                                        <CircularProgress />
                                                    </div>
                                                ) : savedPosts && savedPosts.length > 0 ? (
                                                    savedPosts.map((post, index) => (
                                                        <div key={index} className='border border-slate-500 rounded-md'>
                                                            <PostCard item={post} />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center my-5">
                                                        <Typography variant="body1">No saved posts yet</Typography>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <SavedReels />
                                        )}
                                    </div>
                                ) : value === "repost" ? (
                                    <div className='space-y-5 w-[70%] my-10'>
                                        {repostPost.map((item, index) => <div key={index} className='border border-slate-500 rounded-md'><PostCard></PostCard></div>)}
                                    </div>
                                ) : value === "requests" ? (
                                    <div className='space-y-5 w-[70%] my-10'>
                                        <PendingRequests />
                                    </div>
                                ) : null}
                            </div>
                        </section>

                        <ProfileModel open={open} handleClose={handleClose}></ProfileModel>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Profile