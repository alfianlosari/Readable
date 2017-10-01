export function fetchCommentsForPostId(postId) {
    return fetch(
        `http://localhost:3001/posts/${postId}/comments`,
        {
            headers: { 'Authorization': "udacian" }
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    });
}

export function fetchCommentWithCommentId(commentId) {
    return fetch(
        `http://localhost:3001/comments/${commentId}`,
        {
            headers: { 'Authorization': "udacian" }
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    });
}

export function addComment(comment) {
    return fetch(
        `http://localhost:3001/comments`,
        {
            headers: {
                'Authorization': "udacian", 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(comment)
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    });
}

export function editComment(comment) {
    return fetch(
        `http://localhost:3001/comments/${comment.id}`,
        {
            headers: { 
                'Authorization': "udacian", 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                body: comment.body,
                timestamp: comment.timestamp
            })
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    });    
}

export function deleteComment(commentId) {
    return fetch(
        `http://localhost:3001/comments/${commentId}`,
        {
            headers: { 'Authorization': "udacian" },
            method: 'DELETE'
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    });    
}

export function voteComment(commentId, option) {
    return fetch(
        `http://localhost:3001/comments/${commentId}`,
        {
            headers: {
                'Authorization': "udacian", 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
            method: 'POST',
            body: JSON.stringify({
                option
            })
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    });
}