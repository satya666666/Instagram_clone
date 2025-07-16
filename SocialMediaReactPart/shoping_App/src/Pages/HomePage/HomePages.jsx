import { Grid } from '@mui/material'
import React, { useEffect } from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'
import MiddlePart from '../Middle/MiddlePart'
import Reels from '../Reels/Reels'
import CreateReels from '../CreateReelsPart/CreateReels'
import Profile from '../Profile/Profile'
import UserProfile from '../Profile/UserProfile'
import UserSearch from '../Search/UserSearch'
import HomeRight from '../HomeRight/HomeRight'
import Sidebar from '../SideBar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../redux/Auth/auth.action'
import { store } from '../../redux/Store'
import ChatPage from '../Chat/ChatPage'

const HomePages = () => {
    const dispatch = useDispatch();
    const jwttoken = localStorage.getItem("jwt")
    const { userData } = useSelector(store => store)
    useEffect(() => {
        dispatch(getProfileAction(jwttoken))
        // console.log(userData)
    }, [dispatch])
    
    const location = useLocation();
    
    return (
        <div className='px-20'>
            <Grid container spacing={0}>
                <Grid item xs={0} lg={3}>
                    <div className='sticky top-0'>
                        <Sidebar></Sidebar>
                    </div>
                </Grid>
                <Grid
                    lg={location.pathname === "/" ? 6 : 9}
                    item className='px-5 justify-center' xs={12}>
                    <Routes>
                        <Route path='/' element={<MiddlePart />} />
                        <Route path='/reels' element={<Reels></Reels>} />
                        <Route path='/create-reels' element={<CreateReels></CreateReels>} />
                        <Route path='/profile/:id' element={<Profile />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/user/:userId' element={<UserProfile />} />
                        <Route path='/search' element={<UserSearch />} />
                        <Route path='/message' element={<ChatPage />} />
                        <Route path='/messages' element={<ChatPage />} /> 
                    </Routes>
                </Grid>
                {location.pathname === "/" && <Grid item lg={3} className='hidden lg:block'>
                    <div className='sticky top-0'>
                        <HomeRight></HomeRight>
                    </div>
                </Grid>}
            </Grid>
        </div>
    )
}

export default HomePages