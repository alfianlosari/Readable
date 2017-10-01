import * as PostAPI from '../utils/post_api';
import * as CategoryAPI from '../utils/category_api';

export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const GET_CATEGORY_POSTS = "GET_CATEGORY_POSTS";
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';

export const getPosts = posts => ({
    type: GET_POSTS,
    posts
});

export const getCategoryPosts = posts => ({
    type: GET_CATEGORY_POSTS,
    posts
});

export const getPost = post => ({
    type: GET_POST,
    post
})

export const addPosts = post => ({
    type: ADD_POST,
    post
});

export const updatePost = post => ({
    type: UPDATE_POST,
    post
});

export const votePostAction = post => ({
    type: VOTE_POST,
    post
})

export const deletePost = post => ({
    type: DELETE_POST,
    post
})

export const fetchPosts = () => dispatch => (
    PostAPI.fetchPosts()
        .then((posts) => dispatch(getPosts(posts)))
);

export const fetchPost = (postId) => dispatch => (
    PostAPI.fetchSinglePost(postId)
        .then((post) => dispatch(getPost(post)))
);

export const fetchCategoryPosts = (categoryId) => dispatch => (
    CategoryAPI
        .fetchPostWithCategoryId(categoryId)
        .then((posts) => dispatch(getCategoryPosts(posts)))
);

export const createPost = (post) => dispatch => {
    PostAPI.addPost(post)
    .then((post) => dispatch(addPosts(post)))
};

export const editPost = (post) => dispatch => {
    PostAPI
        .editPost(post)
        .then((post) => dispatch(updatePost(post)))
}

export const votePost = (postId, option) => dispatch => {
    PostAPI
        .votePost(postId, option)
        .then((post) => dispatch(votePostAction(post)))
}

export const removePost = (postId) => dispatch => {
    PostAPI.deletePost(postId)
        .then((post) => dispatch(deletePost(post)))
}