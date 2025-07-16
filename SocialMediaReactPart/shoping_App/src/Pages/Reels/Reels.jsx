import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReelsAction, likeReelAction, saveReelAction } from '../ReelsReducer/Reels.action';
import ReelCard from './ReelCard';
import ReelsNavigation from './ReelsNavigation';
import { CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Reels = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { reels, loading, error } = useSelector(state => state.reels);
    const [activeReelIndex, setActiveReelIndex] = useState(0);
    
    // Check if a specific reel ID is requested in the URL
    const queryParams = new URLSearchParams(location.search);
    const specificReelId = queryParams.get('id');

    useEffect(() => {
        dispatch(getAllReelsAction());
    }, [dispatch]);

    useEffect(() => {
        // If a specific reel ID is provided, find its index and set it as active
        if (specificReelId && reels.length > 0) {
            const index = reels.findIndex(reel => reel.reelsId === parseInt(specificReelId));
            if (index !== -1) {
                setActiveReelIndex(index);
            }
        }
    }, [specificReelId, reels]);

    const handleLikeReel = (reelId) => {
        dispatch(likeReelAction(reelId));
    };

    const handleSaveReel = (reelId) => {
        dispatch(saveReelAction(reelId));
    };

    const handleScroll = (e) => {
        const container = e.currentTarget;
        const scrollPosition = container.scrollTop;
        const reelHeight = container.clientHeight;
        
        // Calculate which reel is currently in view
        const index = Math.round(scrollPosition / reelHeight);
        if (index >= 0 && index < reels.length) {
            setActiveReelIndex(index);
        }
    };

    if (loading && reels.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Error loading reels: {error}
            </div>
        );
    }

    if (reels.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                No reels available. Be the first to create one!
                <ReelsNavigation />
            </div>
        );
    }

    return (
        <div className="relative">
            <div 
                className="h-screen overflow-y-scroll snap-y snap-mandatory"
                onScroll={handleScroll}
            >
                {reels.map((reel, index) => (
                    <div 
                        key={reel.reelsId} 
                        className="h-screen snap-start"
                    >
                        <ReelCard 
                            reel={reel} 
                            isActive={index === activeReelIndex}
                            onLike={handleLikeReel}
                            onSave={handleSaveReel}
                        />
                    </div>
                ))}
            </div>
            <ReelsNavigation />
        </div>
    );
};

export default Reels;
