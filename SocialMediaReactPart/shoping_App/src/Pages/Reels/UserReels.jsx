import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReelsAction } from '../ReelsReducer/Reels.action';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AddIcon from '@mui/icons-material/Add';

const UserReels = ({ userId }) => {
    const dispatch = useDispatch();
    const { userReels, loading, error } = useSelector(state => state.reels);
    const { auth } = useSelector(state => state);
    
    const isOwnProfile = !userId || userId === auth.user?.id;

    useEffect(() => {
        const targetUserId = userId || auth.user?.id;
        if (targetUserId) {
            dispatch(getUserReelsAction(targetUserId));
        }
    }, [dispatch, userId, auth.user?.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                Error loading reels: {error}
            </div>
        );
    }

    if (userReels.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <VideoLibraryIcon style={{ fontSize: 48, color: '#ccc' }} />
                <Typography variant="h6" className="mt-2">
                    {isOwnProfile ? "You haven't created any reels yet" : "This user hasn't created any reels yet"}
                </Typography>
                {isOwnProfile && (
                    <Link to="/create-reel" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-600">
                        <AddIcon className="mr-1" /> Create Reel
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5">
                    {isOwnProfile ? "Your Reels" : "Reels"}
                </Typography>
                {isOwnProfile && (
                    <Link to="/create-reel" className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center hover:bg-blue-600 text-sm">
                        <AddIcon fontSize="small" className="mr-1" /> Create
                    </Link>
                )}
            </div>
            
            <Grid container spacing={2}>
                {userReels.map(reel => (
                    <Grid item xs={6} sm={4} md={3} key={reel.reelsId}>
                        <Link to={`/reels?id=${reel.reelsId}`} className="block">
                            <div className="relative rounded-md overflow-hidden bg-black aspect-square">
                                <video
                                    src={reel.video}
                                    className="w-full h-full object-cover"
                                    onMouseOver={e => e.target.play()}
                                    onMouseOut={e => {
                                        e.target.pause();
                                        e.target.currentTime = 0;
                                    }}
                                    muted
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                    <Typography variant="body2" className="text-white truncate">
                                        {reel.title}
                                    </Typography>
                                    <div className="flex items-center justify-between mt-1">
                                        <div className="flex items-center">
                                            <img 
                                                src={reel.user.userImage} 
                                                alt={reel.user.firstName}
                                                className="w-5 h-5 rounded-full mr-1"
                                            />
                                            <Typography variant="caption" className="text-white">
                                                {reel.user.firstName} {reel.user.lastName}
                                            </Typography>
                                        </div>
                                        <Typography variant="caption" className="text-white flex items-center">
                                            <span className="mr-1">❤️</span> {reel.likedByUsers?.length || 0}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default UserReels;
