import React, { useState, useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import profileImage from '../../assets/MT2024123.jpeg'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction, savePostAction } from '../PostReducer/Post.action';
import { isLikedByReqUser } from '../../Utils/isLikedByReqUser';
const PostCard = ({ item }) => {

    const [showComments, setshowComments] = useState(false)
    const dispatch = useDispatch();
    const [likeicon, setlikeIcon] = useState(true)
    const { posts, auth } = useSelector(Store => Store)
    const handleCreateComment = (content) => {
        // Format the request data correctly for the backend
        const reqData = {
            postId: item.id,
            data: {
                content: content
            }
        }
        console.log("Sending comment:", reqData);
        dispatch(createCommentAction(reqData))
    }
    const likePostHandler = () => {
        dispatch(likePostAction(item.id))
        setlikeIcon(!likeicon)
        console.log("like is clicked")
    }

    // Handle save post
    const savePostHandler = () => {
        dispatch(savePostAction(item.id))
        console.log("Post saved:", item.id)
    }

    return (
        <Card className='mt-5'>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <img src={profileImage} alt="" />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">

                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.user.firstName + " " + item.user.lastName}
                subheader={"@" + item.user.firstName + "9939"}
            />
            <CardMedia
                component="img"
                height="100"
                image={item.image}
                alt="Paella dish"
            />

            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.caption}

                </Typography>
            </CardContent>

            <CardActions className='flex justify-between'>
                <div>
                    <IconButton onClick={likePostHandler}>
                        {!likeicon ? <FavoriteIcon></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}
                    </IconButton>
                    <IconButton>
                        <ShareIcon></ShareIcon>
                    </IconButton>
                    <IconButton onClick={() => { setshowComments(!showComments) }}>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                </div>
                <div >
                    <IconButton onClick={savePostHandler}>
                        {item.saved ? <BookmarkIcon></BookmarkIcon> : <BookmarkBorderIcon></BookmarkBorderIcon>}
                    </IconButton>
                </div>
            </CardActions>

            {showComments && <section>
                <div className='flex items-center space-x-5 mx-3 my-5'>
                    <Avatar sx={{}}></Avatar>

                    <input onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            console.log("Enter is pressed", e.target.value)
                            handleCreateComment(e.target.value)
                            e.target.value = ""
                        }
                    }} type="text" className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2' placeholder='write your comment....' />

                </div>
                <Divider>

                </Divider>
                <div className="mx-3 space-y-2 my-5 text-xs">

                    {item.comments?.map((comment, index) => <div key={index} className="flex  flex-row items-center space-x-5">
                        <Avatar sx={{ height: '2rem', width: '2rem', fontSize: '.8rem' }}>
                            {comment.user.firstName[0]}
                        </Avatar>

                        <p>{comment.content}</p>

                    </div>)}
                </div>


            </section>}

        </Card>
    )
}

export default PostCard