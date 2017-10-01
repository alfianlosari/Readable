
import { GET_POST_COMMENTS, ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, VOTE_COMMENT } from '../actions/comments';

function comments(state = {}, action) {
    switch (action.type) {
        case GET_POST_COMMENTS:
            const obj = {};
            for (let comment of action.comments) {
                obj[comment.id] = comment;
            }

            return {
                ...state,
                ...obj
            }

        case ADD_COMMENT:
        case UPDATE_COMMENT:
        case VOTE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }

        case DELETE_COMMENT:
            const newState = {
                ...state,
            };

            delete newState[action.comment.id];
            return newState;
                

        default:
            return state;

    }
}

export default comments