import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"
import {
  SEND_FOLLOW_REQUEST_SUCCESS,
  ACCEPT_FOLLOW_REQUEST_SUCCESS,
  REJECT_FOLLOW_REQUEST_SUCCESS,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_SUCCESS
} from "../User/user.actionType"

const initialState = {
    jwt: null,
    error: null,
    loading: false,
    userProfile: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:
            return { ...state, loading: true, error: null }

        case GET_PROFILE_SUCCESS:
            return { ...state, userProfile: action.payload, error: null, loading: false };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { ...state, jwt: action.payload, error: null, loading: false }

        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return { ...state, error: action.payload, loading: false }

        case UPDATE_PROFILE_SUCCESS:
            return { ...state, userProfile: action.payload, error: null, loading: false };

        // Update auth state when user sends a follow request
        case SEND_FOLLOW_REQUEST_SUCCESS:
            if (!state.userProfile) return state;
            
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    sentFollowRequests: [
                        ...state.userProfile.sentFollowRequests || [],
                        action.payload.id
                    ]
                }
            };

        // Update auth state when user accepts a follow request
        case ACCEPT_FOLLOW_REQUEST_SUCCESS:
            if (!state.userProfile) return state;
            
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    pendingFollowRequests: state.userProfile.pendingFollowRequests.filter(
                        id => id !== action.payload.id
                    ),
                    followers: [
                        ...state.userProfile.followers || [],
                        action.payload.id
                    ]
                }
            };

        // Update auth state when user rejects a follow request
        case REJECT_FOLLOW_REQUEST_SUCCESS:
            if (!state.userProfile) return state;
            
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    pendingFollowRequests: state.userProfile.pendingFollowRequests.filter(
                        id => id !== action.payload.id
                    )
                }
            };

        // Update auth state when user follows another user
        case FOLLOW_USER_SUCCESS:
            if (!state.userProfile) return state;
            
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    followings: [
                        ...state.userProfile.followings || [],
                        action.payload.id
                    ]
                }
            };

        // Update auth state when user unfollows another user
        case UNFOLLOW_USER_SUCCESS:
            if (!state.userProfile) return state;
            
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    followings: state.userProfile.followings.filter(
                        id => id !== action.payload.id
                    )
                }
            };

        case LOGOUT:
            return {
                ...initialState
            };

        default:
            return state;
    }
}