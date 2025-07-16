import axios from 'axios';
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
import { API_BASE_URL } from '../../Config/api';

// Create an API client with JWT token interceptor
const api = axios.create({
  baseURL: API_BASE_URL
});

// Add a request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Search users
export const searchUserAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await api.get(`/user/search?query=${query}`);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Search error:", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error.message });
  }
};

// Get user profile
export const getUserProfileAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const { data } = await api.get(`/user/user/${userId}`);
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error("Get profile error:", error);
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};

// Follow a user
export const followUserAction = (userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST });
  try {
    const { data } = await api.put(`/user/follow/${userId}`);
    console.log("Follow success:", data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Follow error:", error);
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error.message });
  }
};

// Unfollow a user
export const unfollowUserAction = (userId) => async (dispatch) => {
  dispatch({ type: UNFOLLOW_USER_REQUEST });
  try {
    const { data } = await api.put(`/user/unfollow/${userId}`);
    console.log("Unfollow success:", data);
    dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Unfollow error:", error);
    dispatch({ type: UNFOLLOW_USER_FAILURE, payload: error.message });
  }
};

// Send follow request
export const sendFollowRequestAction = (receiverId) => async (dispatch) => {
  dispatch({ type: SEND_FOLLOW_REQUEST_REQUEST });
  try {
    const { data } = await api.post(`/user/send-follow-request/${receiverId}`);
    console.log("Send request success:", data);
    dispatch({ type: SEND_FOLLOW_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Send request error:", error);
    dispatch({ type: SEND_FOLLOW_REQUEST_FAILURE, payload: error.message });
  }
};

// Accept follow request
export const acceptFollowRequestAction = (requesterId) => async (dispatch) => {
  dispatch({ type: ACCEPT_FOLLOW_REQUEST_REQUEST });
  try {
    const { data } = await api.put(`/user/accept-follow-request/${requesterId}`);
    console.log("Accept request success:", data);
    dispatch({ type: ACCEPT_FOLLOW_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Accept request error:", error);
    dispatch({ type: ACCEPT_FOLLOW_REQUEST_FAILURE, payload: error.message });
  }
};

// Reject follow request
export const rejectFollowRequestAction = (requesterId) => async (dispatch) => {
  dispatch({ type: REJECT_FOLLOW_REQUEST_REQUEST });
  try {
    const { data } = await api.put(`/user/reject-follow-request/${requesterId}`);
    console.log("Reject request success:", data);
    dispatch({ type: REJECT_FOLLOW_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    console.error("Reject request error:", error);
    dispatch({ type: REJECT_FOLLOW_REQUEST_FAILURE, payload: error.message });
  }
};

// Get pending follow requests
export const getPendingRequestsAction = () => async (dispatch) => {
  dispatch({ type: GET_PENDING_REQUESTS_REQUEST });
  try {
    const { data } = await api.get(`/user/pending-follow-requests`);
    console.log("Get pending requests success:", data);
    dispatch({ type: GET_PENDING_REQUESTS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Get pending requests error:", error);
    dispatch({ type: GET_PENDING_REQUESTS_FAILURE, payload: error.message });
  }
};

// Get followers
export const getFollowersAction = () => async (dispatch) => {
  dispatch({ type: GET_FOLLOWERS_REQUEST });
  try {
    const { data } = await api.get('/user/followers');
    dispatch({ type: GET_FOLLOWERS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error fetching followers:", error);
    dispatch({ type: GET_FOLLOWERS_FAILURE, payload: error.message });
    throw error;
  }
};
