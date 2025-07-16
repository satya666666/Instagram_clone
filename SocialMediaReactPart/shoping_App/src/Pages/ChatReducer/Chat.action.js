import * as actionTypes from './Chat.actionType';
import axios from 'axios';
import { API_BASE_URL } from '../../Config/api';

// Create axios instance with JWT token
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include JWT token
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

// Create a new chat with another user
export const createChatAction = (userId) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_CHAT_REQUEST });
    try {
        const response = await api.post('/api/chat/create', { userId });
        dispatch({ type: actionTypes.CREATE_CHAT_SUCCESS, payload: response.data });
        return response.data;
    } catch (error) {
        console.error("Error creating chat:", error);
        dispatch({ type: actionTypes.CREATE_CHAT_FAILURE, payload: error.message });
        throw error;
    }
};

// Get all chats for the current user
export const getAllChatsAction = () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_CHATS_REQUEST });
    try {
        const response = await api.get('/api/chat/users/chats');
        dispatch({ type: actionTypes.GET_ALL_CHATS_SUCCESS, payload: response.data });
        return response.data;
    } catch (error) {
        console.error("Error fetching chats:", error);
        dispatch({ type: actionTypes.GET_ALL_CHATS_FAILURE, payload: error.message });
        throw error;
    }
};

// Get a specific chat by ID
export const getChatByIdAction = (chatId) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_CHAT_REQUEST });
    try {
        const response = await api.get(`/api/chat/find/${chatId}`);
        dispatch({ type: actionTypes.GET_CHAT_SUCCESS, payload: response.data });
        return response.data;
    } catch (error) {
        console.error("Error fetching chat:", error);
        dispatch({ type: actionTypes.GET_CHAT_FAILURE, payload: error.message });
        throw error;
    }
};

// Create a new message in a chat
export const createMessageAction = (chatId, content) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_MESSAGE_REQUEST });
    try {
        console.log('Creating message for chat:', chatId, 'with content:', content);
        
        // Create the message data object with the content only
        // The backend expects just the content in the message DTO
        const messageData = { content };
        
        // Make the API call to create the message
        const response = await api.post(`/api/message/create/${chatId}`, messageData);
        console.log('Message creation response:', response.data);
        
        // Format the payload to include the chatId for the reducer
        const formattedPayload = {
            ...response.data,
            chat: { id: chatId }
        };
        
        console.log('Formatted message payload:', formattedPayload);
        dispatch({ type: actionTypes.CREATE_MESSAGE_SUCCESS, payload: formattedPayload });
        
        // After creating a message, refresh the messages for this chat
        // This ensures we have the latest messages from the database
        dispatch(getMessagesAction(chatId));
        
        return response.data;
    } catch (error) {
        console.error("Error creating message:", error);
        dispatch({ type: actionTypes.CREATE_MESSAGE_FAILURE, payload: error.message });
        throw error;
    }
};

// Get all messages for a specific chat
export const getMessagesAction = (chatId) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_MESSAGES_REQUEST });
    try {
        console.log('Fetching messages for chat:', chatId);
        
        // Use the correct endpoint to get messages for a chat
        // The backend expects /api/message/find/{chatId} based on the controller
        const response = await api.get(`/api/message/find/${chatId}`);
        console.log('Messages response:', response.data);
        
        // Make sure we're passing both the chatId and messages to the reducer
        const payload = {
            chatId: chatId,
            messages: response.data
        };
        
        console.log('Formatted messages payload:', payload);
        dispatch({ 
            type: actionTypes.GET_MESSAGES_SUCCESS, 
            payload: payload
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        dispatch({ type: actionTypes.GET_MESSAGES_FAILURE, payload: error.message });
        throw error;
    }
};

// Mark messages as read for a specific chat
export const markMessagesAsRead = (chatId) => (dispatch) => {
    dispatch({
        type: actionTypes.MARK_MESSAGES_READ,
        payload: { chatId }
    });
};

// Get unread messages count
export const getUnreadMessagesCount = () => async (dispatch, getState) => {
    try {
        const { auth, chat } = getState();
        const userId = auth.userProfile?.id;
        
        if (!userId) return;
        
        // Get all chats for the current user
        const response = await api.get('/api/chat/users/chats');
        const chats = response.data;
        
        // Initialize unread messages objects
        const unreadMessages = {};
        const unreadMessagesByUser = {};
        
        // Process each chat to count unread messages
        for (const chat of chats) {
            const messagesResponse = await api.get(`/api/message/find/${chat.id}`);
            const messages = messagesResponse.data;
            
            // Get unread messages (not from current user and not read)
            const unreadMsgs = messages.filter(msg => 
                msg.user?.id !== userId && !msg.read
            );
            
            // Count total unread messages for this chat
            unreadMessages[chat.id] = unreadMsgs.length;
            
            // Group unread messages by sender
            unreadMsgs.forEach(msg => {
                const senderId = msg.user?.id;
                if (senderId) {
                    if (!unreadMessagesByUser[senderId]) {
                        unreadMessagesByUser[senderId] = {
                            count: 0,
                            user: msg.user,
                            lastMessage: null
                        };
                    }
                    
                    unreadMessagesByUser[senderId].count += 1;
                    
                    // Keep track of the most recent message
                    if (!unreadMessagesByUser[senderId].lastMessage || 
                        new Date(msg.createdAt) > new Date(unreadMessagesByUser[senderId].lastMessage.createdAt)) {
                        unreadMessagesByUser[senderId].lastMessage = msg;
                    }
                }
            });
        }
        
        // Update the unread messages in the state
        dispatch({
            type: actionTypes.UPDATE_UNREAD_MESSAGES,
            payload: unreadMessages
        });
        
        // Update unread messages by user
        dispatch({
            type: actionTypes.UPDATE_UNREAD_MESSAGES_BY_USER,
            payload: unreadMessagesByUser
        });
        
        // Return the total count of unread messages
        return Object.values(unreadMessages).reduce((total, count) => total + count, 0);
    } catch (error) {
        console.error("Error getting unread messages count:", error);
        return 0;
    }
};
