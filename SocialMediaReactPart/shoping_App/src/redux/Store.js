import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk"
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "../Pages/PostReducer/Post.reducer";
import { userReducer } from "./User/user.reducer";
import { reelsReducer } from "../Pages/ReelsReducer/Reels.reducer";
import chatReducer from "../Pages/ChatReducer/Chat.reducer";

const rootReducers = combineReducers({
    auth: authReducer,
    post: postReducer,
    user: userReducer,
    reels: reelsReducer,
    chat: chatReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))