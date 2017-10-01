import * as CommentAPI from '../utils/comment_api';

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export const getPostComments = comments => ({
    type: GET_POST_COMMENTS,
    comments
});

export const addComment = comment => ({
    type: ADD_COMMENT,
    comment
});

export const updateComment = comment => ({
    type: UPDATE_COMMENT,
    comment
})

export const deleteComment = comment => ({
    type: DELETE_COMMENT,
    comment
});

export const voteCommentAction = comment => ({
    type: VOTE_COMMENT,
    comment
});

export const fetchPostComments = (postId) => dispatch => (
    CommentAPI
        .fetchCommentsForPostId(postId)
        .then((comments) => dispatch(getPostComments(comments)))
)

export const createComment = (comment) => dispatch => {
    CommentAPI
        .addComment(comment)
        .then((comment) => dispatch(addComment(comment)))
}

export const editComment = (comment) => dispatch => {
    CommentAPI
        .editComment(comment)
        .then((comment) => dispatch(updateComment(comment)))
}

export const voteComment = (commentId, option) => dispatch => {
    CommentAPI
        .voteComment(commentId, option)
        .then((comment) => dispatch(voteCommentAction(comment)))
}

export const removeComment = (commentId) => dispatch => {
    CommentAPI
        .deleteComment(commentId)
        .then((comment) => dispatch(deleteComment(comment)))
}