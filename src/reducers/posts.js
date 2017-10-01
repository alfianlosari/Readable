import { GET_POSTS, ADD_POST, GET_CATEGORY_POSTS, GET_POST, DELETE_POST, UPDATE_POST, VOTE_POST } from '../actions/posts';

function posts(state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_CATEGORY_POSTS:
            const object = {};
            action.posts.forEach((c) => object[c.id] = c)
            return {
                ...state,
                ...object   
            }

        case GET_POST:
        case ADD_POST:
        case UPDATE_POST:
        case VOTE_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
 
        case DELETE_POST:
            const newState = {
                ...state,
            };

            delete newState[action.post.id];
            return newState;
                

        default:
            return state;
    }
}

export default posts;