import * as actionTypes from './Chat.actionType';

// Initial state
const initialState = {
    chats: [],
    messages: {},
    unreadMessages: {}, // Track unread messages by chatId
    unreadMessagesByUser: {}, // Track unread messages by userId
    selectedChat: null,
    loading: false,
    messageLoading: false,
    error: null
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        // Chat actions
        case actionTypes.CREATE_CHAT_REQUEST:
        case actionTypes.GET_ALL_CHATS_REQUEST:
        case actionTypes.GET_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case actionTypes.CREATE_CHAT_SUCCESS:
            return {
                ...state,
                chats: [action.payload, ...state.chats],
                selectedChat: action.payload,
                loading: false
            };
        
        case actionTypes.GET_ALL_CHATS_SUCCESS:
            return {
                ...state,
                chats: action.payload,
                loading: false
            };
        
        case actionTypes.GET_CHAT_SUCCESS:
            return {
                ...state,
                selectedChat: action.payload,
                loading: false
            };
        
        case actionTypes.CREATE_CHAT_FAILURE:
        case actionTypes.GET_ALL_CHATS_FAILURE:
        case actionTypes.GET_CHAT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        
        // Message actions
        case actionTypes.CREATE_MESSAGE_REQUEST:
        case actionTypes.GET_MESSAGES_REQUEST:
            return {
                ...state,
                messageLoading: true,
                error: null
            };
        
        case actionTypes.CREATE_MESSAGE_SUCCESS:
            const chatId = action.payload.chat.id;
            console.log('CREATE_MESSAGE_SUCCESS - Chat ID:', chatId);
            console.log('CREATE_MESSAGE_SUCCESS - Current messages:', state.messages[chatId] || []);
            console.log('CREATE_MESSAGE_SUCCESS - New message:', action.payload);
            
            const updatedMessages = {
                ...state.messages,
                [chatId]: state.messages[chatId] 
                    ? [...state.messages[chatId], action.payload] 
                    : [action.payload]
            };
            
            console.log('CREATE_MESSAGE_SUCCESS - Updated messages:', updatedMessages);
            
            return {
                ...state,
                messages: updatedMessages,
                messageLoading: false
            };
        
        case actionTypes.GET_MESSAGES_SUCCESS:
            console.log('GET_MESSAGES_SUCCESS - Payload:', action.payload);
            console.log('GET_MESSAGES_SUCCESS - Chat ID:', action.payload.chatId);
            console.log('GET_MESSAGES_SUCCESS - Messages:', action.payload.messages || []);
            
            const newMessagesState = {
                ...state.messages,
                [action.payload.chatId]: action.payload.messages || []
            };
            
            console.log('GET_MESSAGES_SUCCESS - New messages state:', newMessagesState);
            
            return {
                ...state,
                messages: newMessagesState,
                messageLoading: false
            };
            
        case actionTypes.MARK_MESSAGES_READ:
            return {
                ...state,
                unreadMessages: {
                    ...state.unreadMessages,
                    [action.payload.chatId]: 0
                }
            };
            
        case actionTypes.UPDATE_UNREAD_MESSAGES:
            return {
                ...state,
                unreadMessages: action.payload
            };
        
        case actionTypes.UPDATE_UNREAD_MESSAGES_BY_USER:
            return {
                ...state,
                unreadMessagesByUser: action.payload
            };
        
        case actionTypes.CREATE_MESSAGE_FAILURE:
        case actionTypes.GET_MESSAGES_FAILURE:
            return {
                ...state,
                messageLoading: false,
                error: action.payload
            };
        
        default:
            return state;
    }
};

export default chatReducer;
