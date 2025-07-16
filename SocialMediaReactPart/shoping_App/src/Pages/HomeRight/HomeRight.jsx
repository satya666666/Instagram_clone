import React, { useEffect } from 'react'
import SearchUser from '../SearchUser/SearchUser'
import PopularUserCard from '../Popularuser/PopularUserCard'
import { Card, CircularProgress, Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { searchUserAction } from '../../redux/User/user.action'

const HomeRight = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.user);
    const authUser = useSelector(state => state.auth.userProfile);
    
    useEffect(() => {
        // Fetch user suggestions when component mounts
        dispatch(searchUserAction(''));
    }, [dispatch]);
    
    // Filter out current user and limit to 5 suggestions
    const suggestions = users?.filter(user => user.id !== authUser?.id).slice(0, 5) || [];
    
    return (
        <div className='pr-5'>
            <SearchUser />
            <Card className='p-5'>
                <div className="flex justify-between py-5 items-center">
                    <p className='font-semibold opacity-70'>Suggestions for You</p>
                    <p className='text-xs font-semibold opacity-95 cursor-pointer' 
                       onClick={() => window.location.href = '/search'}>
                        View All
                    </p>
                </div>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : suggestions.length > 0 ? (
                    <div className='space-y-5'>
                        {suggestions.map((user, index) => (
                            <PopularUserCard key={user.id || index} user={user} />
                        ))}
                    </div>
                ) : (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            No suggestions available
                        </Typography>
                    </Box>
                )}
            </Card>
        </div>
    )
}

export default HomeRight