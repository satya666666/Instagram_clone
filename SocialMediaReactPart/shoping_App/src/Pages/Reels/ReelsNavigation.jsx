import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const ReelsNavigation = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/create-reels')}
                className="rounded-full"
                sx={{ borderRadius: '20px' }}
            >
                Create Reel
            </Button>
            
            <Button
                variant="contained"
                color="secondary"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                sx={{ borderRadius: '20px' }}
            >
                Home
            </Button>
            
            <Button
                variant="contained"
                color="info"
                startIcon={<BookmarkIcon />}
                onClick={() => navigate('/profile?tab=saved')}
                sx={{ borderRadius: '20px' }}
            >
                Saved Reels
            </Button>
        </div>
    );
};

export default ReelsNavigation;
