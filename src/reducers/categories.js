import { GET_CATEGORIES } from '../actions/categories';

function categories(state = {}, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            const object = {};
            action.categories.forEach((c) => object[c.path] = c)
            
            return {
                ...state,
                ...object    
            }

        default:
            return state;
    }

}

export default categories;