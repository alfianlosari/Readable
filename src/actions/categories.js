import * as CategoryAPI from '../utils/category_api';

export const GET_CATEGORIES = "GET_CATEGORIES";
export const getCategories = categories => ({
    type: GET_CATEGORIES,
    categories
});

export const fetchCategories = () => dispatch => (
    CategoryAPI
        .fetchCategories()
        .then((categories) => dispatch(getCategories(categories)))
);