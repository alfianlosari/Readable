export function fetchPostWithCategoryId(categoryId) {
    return fetch(
        `http://localhost:3001/${categoryId}/posts`,
        {
            headers: { 'Authorization': "udacian" }
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    });
}



export function fetchCategories() {
    return fetch(
        'http://localhost:3001/categories',
        {
            headers: { 'Authorization': "udacian" }
        }
    ).then((response) => {
        return response.json();
    }).then((json) => {
        return json.categories;
    });
}