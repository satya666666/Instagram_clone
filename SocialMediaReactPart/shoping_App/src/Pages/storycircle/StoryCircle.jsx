import React from 'react'
import profileImage from '../../assets/MT2024123.jpeg'
import { Avatar } from '@mui/material'
const StoryCircle = () => {
    return (
        <div className='flex flex-col items-center mr-3 cursor-pointer'>
            <Avatar src={profileImage} sx={{ width: '4rem', height: '4rem' }} >


            </Avatar>
            <p >Ramji</p>
        </div>
    )
}

export default StoryCircle