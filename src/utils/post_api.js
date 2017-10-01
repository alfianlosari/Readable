// Get all posts

export function fetchPosts() {
    return fetch(
        'http://localhost:3001/posts',
        {
            headers: { 'Authorization': "udacian" }
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    })
}

// Get all posts for particular category

export function fetchPostsForCategory(categoryId) {
    return fetch(
        `http://localhost:3001/${categoryId}/posts`,
        {
            headers: { 'Authorization': "udacian" }
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json.categories;
    })
}


export function fetchSinglePost(postId) {
    return fetch(
        `http://localhost:3001/posts/${postId}`,
        {
            headers: { 'Authorization': "udacian" }
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    })
}

// Add single post

export function addPost(post) {
    return fetch(
        'http://localhost:3001/posts',
        {
            headers: { 
                'Authorization': "udacian", 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(post)
        },
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    })
}

export function editPost(post) {
    return fetch(
        `http://localhost:3001/posts/${post.id}`,
        {
            headers: {
                'Authorization': "udacian", 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
            method: 'PUT',
            body: JSON.stringify({
                title: post.title,
                body: post.body,
            })
        },
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    })
}

export function deletePost(postId) {
    return fetch(
        `http://localhost:3001/posts/${postId}`,
        {
            headers: { 'Authorization': "udacian" },
            method: 'DELETE'
        },
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    })
}

export function votePost(postId, vote) {
    return fetch(
        `http://localhost:3001/posts/${postId}`,
        {
            headers: {
                'Authorization': "udacian", 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                option: vote
            })
        },
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    })
}