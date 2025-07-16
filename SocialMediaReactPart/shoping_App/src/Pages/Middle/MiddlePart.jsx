import { useEffect, useState } from 'react'
import { Avatar, Card, IconButton, Typography, Box, CircularProgress } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from '../storycircle/StoryCircle';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreateUserPost from '../CreatePost/CreateUserPost';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostsAndFollowingPostsAction } from '../PostReducer/Post.action';

const story = [1, 1, 1, 1, 1];

const MiddlePart = () => {
    const [openCreatePostModel, setOpenCreatePostModel] = useState(false);
    const { post } = useSelector(store => store);
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    //  for create post model
    const handleOpenCratePostModel = () => {
        setOpenCreatePostModel(true);
    }

    const handleCloseCreatePostModel = () => {
        setOpenCreatePostModel(false);
        // Reload posts after creating a new post
        loadPosts();
    }
    
    // Function to load posts
    const loadPosts = () => {
        setLoading(true);
        dispatch(getAllPostsAndFollowingPostsAction())
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    };
    
    // Fetch all posts when component mounts
    useEffect(() => {
        loadPosts();
        
        // Set up interval to refresh posts every 30 seconds
        const interval = setInterval(() => {
            loadPosts();
        }, 30000);
        
        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <div>
            <div className="px-10">
                <Card className="flex items-center p-5 rounded-b-md mt-5">
                    <div className='flex flex-col items-center mr-4 cursor-pointer'>
                        <Avatar sx={{ width: '4rem', height: '4rem' }} >
                            <AddIcon sx={{ fontSize: '3rem' }}></AddIcon>
                        </Avatar>
                        <p>New</p>
                    </div>
                    {story.map((item, index) => <StoryCircle key={index}></StoryCircle>)}
                </Card>

                <Card className='p-5 mt-5 '>
                    <div className='flex justify-between'>
                        <Avatar 
                            sx={{ cursor: 'pointer' }}
                            src={auth?.userProfile?.image}
                        >
                            {auth?.userProfile?.firstName?.charAt(0)}
                        </Avatar>
                        <input 
                            onClick={handleOpenCratePostModel} 
                            readOnly 
                            type="text" 
                            placeholder='Create Post...' 
                            className='outline-none w-[85%] rounded-full px-3 bg-transparent border-[#3b4054] border' 
                        />
                    </div>

                    <div className='flex justify-center space-x-9 mt-5'>
                        <div className='flex items-center'>
                            <IconButton color='primary' onClick={handleOpenCratePostModel}>
                                <ImageIcon></ImageIcon>
                            </IconButton>
                            <span>Photo</span>
                        </div>

                        <div className='flex items-center'>
                            <IconButton color='primary' onClick={handleOpenCratePostModel}>
                                <VideoCallIcon></VideoCallIcon>
                            </IconButton>
                            <span>Video</span>
                        </div>
                        <div className='flex items-center'>
                            <IconButton color='primary' onClick={handleOpenCratePostModel}>
                                <ArticleIcon></ArticleIcon>
                            </IconButton>
                            <span>Write Article</span>
                        </div>
                    </div>
                </Card>
                
                <div className='mt-5'>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : post.posts && post.posts.length > 0 ? (
                        post.posts.map((item, index) => <PostCard item={item} key={item.id || index} />)
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="body1" color="text.secondary">
                                No posts available. Create a post or follow other users to see their posts!
                            </Typography>
                        </Box>
                    )}
                </div>
            </div>
            <div>
                <CreateUserPost handleClose={handleCloseCreatePostModel} open={openCreatePostModel}></CreateUserPost>
            </div>
        </div>
    )
}

export default MiddlePart