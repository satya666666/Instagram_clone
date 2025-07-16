import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { updateProfileAction } from '../../redux/Auth/auth.action';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    overflow: 'scroll-y',
    borderRadius: 3
};




const ProfileModel = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const handleOpen = () => setOpen(true);

    const formik = useFormik({
        inttialValues: {
            firstName: "",
            lastName: ""
        },
        onSubmit: (values,) => {
            console.log(values);
            dispatch(updateProfileAction(values));
        }
    })

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <IconButton onClick={handleClose}>
                                    <CloseIcon></CloseIcon>
                                </IconButton>
                                <p>Edit Profile</p>
                            </div>
                            <Button type='submit'>Save</Button>
                        </div>
                        <div>
                            <div className='h-[15rem]'>
                                <img className='w-full h-full rounded-t-md' src="https://cdn.pixabay.com/photo/2015/05/01/22/04/girl-749113_640.jpg" alt="" />

                            </div>
                            <div className='pl-5'>
                                <Avatar className='transform translate-y-18 ' sx={{ width: '10rem', height: '10rem' }} src='https://cdn.pixabay.com/photo/2015/05/01/22/04/girl-749113_640.jpg'></Avatar>

                            </div>
                        </div>

                        <div className='space-y-3'>
                            <TextField
                                fullWidth
                                id='firstName'
                                name='firstName'
                                label='First Name'
                                value={formik.values?.firstName}
                                onChange={formik.handleChange}
                            ></TextField>

                            <TextField
                                fullWidth
                                id='lastName'
                                name='lastName'
                                label='last Name'
                                value={formik.values?.lastName}
                                onChange={formik.handleChange}
                            ></TextField>

                        </div>
                    </form>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>

                </Box>
            </Modal>
        </div>
    );
}
export default ProfileModel