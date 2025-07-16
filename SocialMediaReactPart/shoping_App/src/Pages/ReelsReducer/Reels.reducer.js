import * as actionTypes from './Reels.actionType';

const initialState = {
    reels: [],
    userReels: [],
    savedReels: [],
    loading: false,
    error: null,
    reelComments: {},
    commentLoading: false
};

export const reelsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        // Create Reel
        case actionTypes.CREATE_REEL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.CREATE_REEL_SUCCESS:
            return {
                ...state,
                loading: false,
                reels: [payload, ...state.reels],
                userReels: [payload, ...state.userReels]
            };
        case actionTypes.CREATE_REEL_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };

        // Get All Reels
        case actionTypes.GET_ALL_REELS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_ALL_REELS_SUCCESS:
            return {
                ...state,
                loading: false,
                reels: payload
            };
        case actionTypes.GET_ALL_REELS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };

        // Get User Reels
        case actionTypes.GET_USER_REELS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_USER_REELS_SUCCESS:
            return {
                ...state,
                loading: false,
                userReels: payload
            };
        case actionTypes.GET_USER_REELS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };

        // Like Reel
        case actionTypes.LIKE_REEL_REQUEST:
            return {
                ...state,
                error: null
            };
        case actionTypes.LIKE_REEL_SUCCESS:
            // Update the reel in both reels and userReels arrays
            return {
                ...state,
                reels: state.reels.map(reel => 
                    reel.reelsId === payload.reelsId ? payload : reel
                ),
                userReels: state.userReels.map(reel => 
                    reel.reelsId === payload.reelsId ? payload : reel
                ),
                savedReels: state.savedReels.map(reel => 
                    reel.reelsId === payload.reelsId ? payload : reel
                )
            };
        case actionTypes.LIKE_REEL_FAILURE:
            return {
                ...state,
                error: payload
            };

        // Save Reel
        case actionTypes.SAVE_REEL_REQUEST:
            return {
                ...state,
                error: null
            };
        case actionTypes.SAVE_REEL_SUCCESS:
            // Update the reel in all arrays and add/remove from savedReels
            const updatedReels = state.reels.map(reel => 
                reel.reelsId === payload.reelsId ? payload : reel
            );
            const updatedUserReels = state.userReels.map(reel => 
                reel.reelsId === payload.reelsId ? payload : reel
            );
            
            let updatedSavedReels;
            if (payload.saved) {
                // Add to saved if not already there
                const exists = state.savedReels.some(reel => reel.reelsId === payload.reelsId);
                updatedSavedReels = exists 
                    ? state.savedReels.map(reel => reel.reelsId === payload.reelsId ? payload : reel)
                    : [...state.savedReels, payload];
            } else {
                // Remove from saved
                updatedSavedReels = state.savedReels.filter(reel => reel.reelsId !== payload.reelsId);
            }
            
            return {
                ...state,
                reels: updatedReels,
                userReels: updatedUserReels,
                savedReels: updatedSavedReels
            };
        case actionTypes.SAVE_REEL_FAILURE:
            return {
                ...state,
                error: payload
            };

        // Get Saved Reels
        case actionTypes.GET_SAVED_REELS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_SAVED_REELS_SUCCESS:
            return {
                ...state,
                loading: false,
                savedReels: payload
            };
        case actionTypes.GET_SAVED_REELS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };

        // Add Reel Comment
        case actionTypes.ADD_REEL_COMMENT_REQUEST:
            return {
                ...state,
                commentLoading: true,
                error: null
            };
        case actionTypes.ADD_REEL_COMMENT_SUCCESS:
            // Add the new comment to the comments for this reel
            const reelId = payload.reelsId;
            const existingComments = state.reelComments[reelId] || [];
            
            return {
                ...state,
                commentLoading: false,
                reelComments: {
                    ...state.reelComments,
                    [reelId]: [...existingComments, payload]
                }
            };
        case actionTypes.ADD_REEL_COMMENT_FAILURE:
            return {
                ...state,
                commentLoading: false,
                error: payload
            };

        // Get Reel Comments
        case actionTypes.GET_REEL_COMMENTS_REQUEST:
            return {
                ...state,
                commentLoading: true,
                error: null
            };
        case actionTypes.GET_REEL_COMMENTS_SUCCESS:
            return {
                ...state,
                commentLoading: false,
                reelComments: {
                    ...state.reelComments,
                    [payload.reelId]: payload.comments
                }
            };
        case actionTypes.GET_REEL_COMMENTS_FAILURE:
            return {
                ...state,
                commentLoading: false,
                error: payload
            };

        // Delete Reel Comment
        case actionTypes.DELETE_REEL_COMMENT_REQUEST:
            return {
                ...state,
                commentLoading: true,
                error: null
            };
        case actionTypes.DELETE_REEL_COMMENT_SUCCESS:
            // Remove the deleted comment from all reels
            const updatedComments = {};
            
            Object.keys(state.reelComments).forEach(reelId => {
                updatedComments[reelId] = state.reelComments[reelId].filter(
                    comment => comment.id !== payload
                );
            });
            
            return {
                ...state,
                commentLoading: false,
                reelComments: updatedComments
            };
        case actionTypes.DELETE_REEL_COMMENT_FAILURE:
            return {
                ...state,
                commentLoading: false,
                error: payload
            };

        // Share Reel
        case actionTypes.SHARE_REEL_REQUEST:
        case actionTypes.SHARE_REEL_SUCCESS:
        case actionTypes.SHARE_REEL_FAILURE:
            // For sharing, we don't need to update the state since it's just an external action
            return state;

        default:
            return state;
    }
};
