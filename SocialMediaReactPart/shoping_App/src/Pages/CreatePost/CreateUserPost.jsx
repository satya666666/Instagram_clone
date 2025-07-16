import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material'
import { useFormik } from 'formik';
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import React, { useState } from 'react'
import { uploadToCloudinary } from '../../Utils/UploadToCloudniry';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../PostReducer/Post.action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadiusd: '0.6rem',
    outline: 'none'
};

const CreateUserPost = ({ open, handleClose }) => {
    const [selectedImage, setSelectedImage] = useState()
    const [selectedVideo, setSelectedVideo] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);

    const handleSelectImage = async (event) => {
        setIsLoading(true)
        const imageUrl = await uploadToCloudinary(event.target.files[0], 'image')
        setSelectedImage(imageUrl)
        setIsLoading(false)
        formik.setFieldValue("image", imageUrl)
    }
    
    const handleSelectVideo = async (event) => {
        setIsLoading(true)
        const videoUrl = await uploadToCloudinary(event.target.files[0], 'video')
        setSelectedVideo(videoUrl)
        setIsLoading(false)
        formik.setFieldValue("video", videoUrl)
    }

    const handleCloseIsLoading = () => {
        setIsLoading(false);
    };
    
    const handleOpenILoading = () => {
        setIsLoading(true);
    };

    const formik = useFormik({
        initialValues: {
            caption: '',
            image: '',
            video: ''
        },
        onSubmit: (values) => {
            // Create the post
            dispatch(createPostAction(values))
            console.log("Creating post with values:", values)
            
            // Reset form and close modal
            formik.resetForm();
            setSelectedImage(null);
            setSelectedVideo(null);
            handleClose();
        }
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className='flex space-x-4 items-center'>
                            <Avatar src={auth?.userProfile?.image}>
                                {auth?.userProfile?.firstName?.charAt(0)}
                            </Avatar>
                            <div>
                                <p className='font-bold text-lg'>{auth?.userProfile?.firstName} {auth?.userProfile?.lastName}</p>
                                <p className='text-sm'>@{auth?.userProfile?.firstName?.toLowerCase() || "user"}9939</p>
                            </div>
                        </div>

                        <textarea 
                            placeholder='Write caption...' 
                            name='caption' 
                            id='caption'
                            value={formik.values.caption} 
                            rows={5} 
                            onChange={formik.handleChange} 
                            style={{ 
                                border: '1px solid black', 
                                borderRadius: '10px', 
                                width: '100%', 
                                padding: '10px',
                                marginTop: '15px'
                            }}
                        />

                        <div className="flex space-x-5 items-center mt-5">
                            <div>
                                <input type="file" accept='image/*' onChange={handleSelectImage}
                                    style={{ display: 'none' }} id='image-input' />
                                <label htmlFor='image-input'>
                                    <IconButton color='primary' component="span">
                                        <ImageIcon />
                                    </IconButton>
                                </label>
                                <span>Image</span>
                            </div>
                            <div>
                                <input type="file" accept='video/*' onChange={handleSelectVideo}
                                    style={{ display: 'none' }} id='video-input' />
                                <label htmlFor='video-input'>
                                    <IconButton color='primary' component="span">
                                        <VideoCallIcon />
                                    </IconButton>
                                </label>
                                <span>Video</span>
                            </div>
                        </div>

                        {selectedImage && (
                            <div className='mt-5'>
                                <img src={selectedImage} alt="Selected" className='h-[250px] w-full object-cover rounded-md' />
                            </div>
                        )}
                        {selectedVideo && (
                            <div className='mt-5'>
                                <video src={selectedVideo} controls className='h-[250px] w-full rounded-md' />
                            </div>
                        )}

                        <div className='flex justify-end mt-5'>
                            <Button variant='contained' type='submit' disabled={isLoading}>Post</Button>
                        </div>
                    </div>
                </form>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                    onClick={handleCloseIsLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Modal>
    )
}

export default CreateUserPost