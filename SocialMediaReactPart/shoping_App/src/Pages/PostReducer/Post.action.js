import { api } from "../../Config/api"
import { 
    CREATE_COMMENT_FAILURE, 
    CREATE_COMMENT_REQUEST, 
    CREATE_COMMENT_SUCCESS, 
    CREATE_POST_FAILURE, 
    CREATE_POST_REQUEST, 
    CREATE_POST_SUCCESS, 
    GET_ALL_POST_FAILURE, 
    GET_ALL_POST_REQUEST, 
    GET_ALL_POST_SUCCESS, 
    GET_FOLLOWING_POST_FAILURE, 
    GET_FOLLOWING_POST_REQUEST, 
    GET_FOLLOWING_POST_SUCCESS, 
    GET_SAVED_POSTS_FAILURE, 
    GET_SAVED_POSTS_REQUEST, 
    GET_SAVED_POSTS_SUCCESS, 
    GET_USERS_POST_FAILURE, 
    GET_USERS_POST_REQUEST, 
    GET_USERS_POST_SUCCESS, 
    LIKE_POST_FAILURE, 
    LIKE_POST_REQUEST, 
    LIKE_POST_SUCCESS, 
    SAVE_POST_FAILURE, 
    SAVE_POST_REQUEST, 
    SAVE_POST_SUCCESS 
} from "./Post.actionType"

export const createPostAction = (postData) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST });
    try {
        const { data } = await api.post('api/posts/user', postData);
        dispatch({ type: CREATE_POST_SUCCESS, payload: data });
        console.log("created post", data);
        
        // After creating a post, fetch all posts to update the feed
        dispatch(getAllPostsAndFollowingPostsAction());
    } catch (error) {
        console.log("error", error);
        dispatch({ type: CREATE_POST_FAILURE, payload: error });
    }
};

export const getAllPostAction = () => async (dispatch) => {
    dispatch({ type: GET_ALL_POST_REQUEST })
    try {
        const { data } = await api.get('api/posts/AllPost')
        dispatch({ type: GET_ALL_POST_SUCCESS, payload: data })
        console.log("All posts fetched", data)
    } catch (error) {
        console.log("error", error);
        dispatch({ type: GET_ALL_POST_FAILURE, payload: error })
    }
}

// Get posts from users that the current user follows
export const getFollowingPostsAction = () => async (dispatch) => {
    dispatch({ type: GET_FOLLOWING_POST_REQUEST })
    try {
        const { data } = await api.get('api/posts/following')
        dispatch({ type: GET_FOLLOWING_POST_SUCCESS, payload: data })
        console.log("Following users' posts fetched", data)
    } catch (error) {
        console.log("error", error);
        dispatch({ type: GET_FOLLOWING_POST_FAILURE, payload: error })
    }
}

// Get all posts - both the user's own posts and posts from users they follow
export const getAllPostsAndFollowingPostsAction = () => async (dispatch) => {
    dispatch({ type: GET_ALL_POST_REQUEST })
    try {
        // Fetch posts from users the current user follows
        const followingResponse = await api.get('api/posts/following');
        const followingPosts = followingResponse.data || [];
        
        // Fetch the current user's own posts
        const myPostsResponse = await api.get('api/posts/my-posts');
        const myPosts = myPostsResponse.data || [];
        
        // Combine both arrays and sort by creation date (newest first)
        const allPosts = [...followingPosts, ...myPosts];
        
        // Remove duplicates (in case a post appears in both arrays)
        const uniquePosts = allPosts.filter((post, index, self) =>
            index === self.findIndex((p) => p.id === post.id)
        );
        
        // Sort by creation date (newest first)
        const sortedPosts = uniquePosts.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        dispatch({ type: GET_ALL_POST_SUCCESS, payload: sortedPosts });
        console.log("Combined posts fetched", sortedPosts);
    } catch (error) {
        console.log("Error fetching posts:", error);
        dispatch({ type: GET_ALL_POST_FAILURE, payload: error });
    }
};

// New action to get only current user's posts
export const getCurrentUserPostsAction = () => async (dispatch) => {
    dispatch({ type: GET_USERS_POST_REQUEST })
    try {
        // Use the dedicated endpoint for current user's posts
        const { data } = await api.get('api/posts/my-posts')
        dispatch({ type: GET_USERS_POST_SUCCESS, payload: data })
        console.log("Current user's posts fetched", data)
    } catch (error) {
        console.log("error", error);
        dispatch({ type: GET_USERS_POST_FAILURE, payload: error })
    }
}

export const getUserPost = (userId) => async (dispatch) => {
    dispatch({ type: GET_USERS_POST_REQUEST })
    try {
        const { data } = await api.get(`api/posts/AllUserPost/user/${userId}`)
        dispatch({ type: GET_USERS_POST_SUCCESS, payload: data })
        console.log("User posts fetched", data)
    } catch (error) {
        console.log("error", error);
        dispatch({ type: GET_USERS_POST_FAILURE, payload: error })
    }
}

export const likePostAction = (postId) => async (dispatch) => {
    dispatch({ type: LIKE_POST_REQUEST })
    try {
        const { data } = await api.put(`api/posts/like/${postId}`)
        dispatch({ type: LIKE_POST_SUCCESS, payload: data })
        console.log("Post liked", data)
    } catch (error) {
        console.log("error", error);
        dispatch({ type: LIKE_POST_FAILURE, payload: error })
    }
}

// CREATE COMMENT
export const createCommentAction = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST })
    try {
        // Send only the content directly, not wrapped in a data object
        const requestBody = { content: reqData.data.content };
        const { data } = await api.post(`/comment/post/${reqData.postId}`, requestBody)
        dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data })
        console.log("Comment created", data)
    } catch (error) {
        console.log("error", error);
        dispatch({ type: CREATE_COMMENT_FAILURE, payload: error })
    }
}

// Save a post
export const savePostAction = (postId) => async (dispatch) => {
    dispatch({ type: SAVE_POST_REQUEST })
    try {
        const { data } = await api.put(`/api/posts/saved/post/${postId}`)
        dispatch({ type: SAVE_POST_SUCCESS, payload: data })
        console.log("Post saved", data)
    } catch (error) {
        console.log("error", error);
        dispatch({ type: SAVE_POST_FAILURE, payload: error })
    }
}

// Get saved posts
export const getSavedPostsAction = () => async (dispatch) => {
    dispatch({ type: GET_SAVED_POSTS_REQUEST })
    try {
        const { data } = await api.get('/api/posts/saved')
        dispatch({ type: GET_SAVED_POSTS_SUCCESS, payload: data })
        console.log("Saved posts fetched", data)
    } catch (error) {
        console.log("error", error);
        dispatch({ type: GET_SAVED_POSTS_FAILURE, payload: error })
    }
}