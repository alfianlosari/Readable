import React, { Component } from 'react'
import ListPosts from './ListPosts';

class CategoryDetail extends Component {

	render() {
		const categoryId = this.props.match.params.categoryId
        return (
            <div className="category-view">
				<h1>{categoryId}</h1>
				<ListPosts
					categoryId={categoryId}
				/>
            </div>
        )
    }
}

export default CategoryDetail

