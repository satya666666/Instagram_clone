import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSavedReelsAction } from '../ReelsReducer/Reels.action';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const SavedReels = () => {
    const dispatch = useDispatch();
    const { savedReels, loading, error } = useSelector(state => state.reels);

    useEffect(() => {
        dispatch(getSavedReelsAction());
    }, [dispatch]);

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
                Error loading saved reels: {error}
            </div>
        );
    }

    if (savedReels.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <VideoLibraryIcon style={{ fontSize: 48, color: '#ccc' }} />
                <Typography variant="h6" className="mt-2">No saved reels</Typography>
                <Typography variant="body2" className="mt-1">
                    Reels you save will appear here
                </Typography>
                <Link to="/reels" className="mt-4 text-blue-500 hover:underline">
                    Browse reels
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Typography variant="h5" className="mb-4">Saved Reels</Typography>
            <Grid container spacing={2}>
                {savedReels.map(reel => (
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
                                    <div className="flex items-center mt-1">
                                        <img 
                                            src={reel.user.userImage} 
                                            alt={reel.user.firstName}
                                            className="w-5 h-5 rounded-full mr-1"
                                        />
                                        <Typography variant="caption" className="text-white">
                                            {reel.user.firstName} {reel.user.lastName}
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

export default SavedReels;
