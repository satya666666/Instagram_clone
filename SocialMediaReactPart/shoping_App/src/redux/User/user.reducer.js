import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  SEND_FOLLOW_REQUEST_REQUEST,
  SEND_FOLLOW_REQUEST_SUCCESS,
  SEND_FOLLOW_REQUEST_FAILURE,
  ACCEPT_FOLLOW_REQUEST_REQUEST,
  ACCEPT_FOLLOW_REQUEST_SUCCESS,
  ACCEPT_FOLLOW_REQUEST_FAILURE,
  REJECT_FOLLOW_REQUEST_REQUEST,
  REJECT_FOLLOW_REQUEST_SUCCESS,
  REJECT_FOLLOW_REQUEST_FAILURE,
  GET_PENDING_REQUESTS_REQUEST,
  GET_PENDING_REQUESTS_SUCCESS,
  GET_PENDING_REQUESTS_FAILURE,
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAILURE
} from './user.actionType';

const initialState = {
  loading: false,
  error: null,
  users: [],
  userProfile: null,
  pendingRequests: [],
  followers: [],
  followersLoading: false,
  followersError: null,
  followSuccess: false,
  unfollowSuccess: false,
  sendRequestSuccess: false,
  requestedUserIds: [], // Track which users have pending requests as an array
  acceptRequestSuccess: false,
  rejectRequestSuccess: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Search User
    case SEARCH_USER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
    case FOLLOW_USER_REQUEST:
    case UNFOLLOW_USER_REQUEST:
    case ACCEPT_FOLLOW_REQUEST_REQUEST:
    case REJECT_FOLLOW_REQUEST_REQUEST:
    case GET_PENDING_REQUESTS_REQUEST:
    case SEND_FOLLOW_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        followSuccess: false,
        unfollowSuccess: false,
        acceptRequestSuccess: false,
        rejectRequestSuccess: false
      };
      
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        error: null
      };

    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        followSuccess: true,
        error: null
      };

    case UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        unfollowSuccess: true,
        error: null
      };

    case SEND_FOLLOW_REQUEST_SUCCESS:
      // Add the requested user ID to the array of requested users if not already there
      const userId = action.payload.id;
      const alreadyRequested = state.requestedUserIds.includes(userId);
      
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        sendRequestSuccess: true,
        requestedUserIds: alreadyRequested 
          ? state.requestedUserIds 
          : [...state.requestedUserIds, userId],
        error: null
      };

    case ACCEPT_FOLLOW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        acceptRequestSuccess: true,
        pendingRequests: state.pendingRequests.filter(
          user => user.id !== action.payload.id
        ),
        error: null
      };

    case REJECT_FOLLOW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        rejectRequestSuccess: true,
        pendingRequests: state.pendingRequests.filter(
          user => user.id !== action.payload.id
        ),
        error: null
      };

    case GET_PENDING_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        pendingRequests: action.payload,
        error: null
      };

    // Followers actions
    case GET_FOLLOWERS_REQUEST:
      return { 
        ...state, 
        followersLoading: true, 
        followersError: null 
      };

    case GET_FOLLOWERS_SUCCESS:
      return { 
        ...state, 
        followers: action.payload, 
        followersLoading: false, 
        followersError: null 
      };

    case GET_FOLLOWERS_FAILURE:
      return { 
        ...state, 
        followersLoading: false, 
        followersError: action.payload 
      };

    case SEARCH_USER_FAILURE:
    case GET_USER_PROFILE_FAILURE:
    case FOLLOW_USER_FAILURE:
    case UNFOLLOW_USER_FAILURE:
    case SEND_FOLLOW_REQUEST_FAILURE:
    case ACCEPT_FOLLOW_REQUEST_FAILURE:
    case REJECT_FOLLOW_REQUEST_FAILURE:
    case GET_PENDING_REQUESTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
