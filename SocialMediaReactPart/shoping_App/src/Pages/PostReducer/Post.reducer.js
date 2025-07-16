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
} from "./Post.actionType";


const initialState = {
    post: null,
    loading: false,
    error: null,
    posts: [],
    followingPosts: [],
    savedPosts: [],
    like: null,
    comment: [],
    newComment: null
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case GET_USERS_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case GET_FOLLOWING_POST_REQUEST:
        case CREATE_COMMENT_REQUEST:
        case SAVE_POST_REQUEST:
        case GET_SAVED_POSTS_REQUEST:
            return { ...state, error: null, loading: true }

        case CREATE_POST_SUCCESS:
            return {
                ...state, post: action.payload,
                posts: [action.payload, ...state.posts],
                loading: false,
                error: null
            }
        case GET_ALL_POST_SUCCESS:
            return {
                ...state,
                newComment: action.payload,
                posts: action.payload,
                loading: false,
                error: null
            }
        case GET_FOLLOWING_POST_SUCCESS:
            return {
                ...state,
                followingPosts: action.payload,
                loading: false,
                error: null
            }
        case GET_USERS_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null
            }
        case LIKE_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map(item => item.id === action.payload.id ? action.payload : item),
                loading: false,
                error: null
            }
        case CREATE_COMMENT_SUCCESS:
            // Find the post that the comment belongs to
            const updatedPosts = state.posts.map(post => {
                if (post.id === action.payload.post.id) {
                    // Create a new post object with the updated comments array
                    return {
                        ...post,
                        comments: [...post.comments, action.payload]
                    };
                }
                return post;
            });
            
            return {
                ...state,
                posts: updatedPosts,
                loading: false,
                error: null
            }
            
        case SAVE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => 
                    post.id === action.payload.id 
                        ? { ...post, saved: true } 
                        : post
                ),
                loading: false,
                error: null
            }
            
        case GET_SAVED_POSTS_SUCCESS:
            return {
                ...state,
                savedPosts: action.payload,
                loading: false,
                error: null
            }

        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case GET_USERS_POST_FAILURE:
        case LIKE_POST_FAILURE:
        case GET_FOLLOWING_POST_FAILURE:
        case CREATE_COMMENT_FAILURE:
        case SAVE_POST_FAILURE:
        case GET_SAVED_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}