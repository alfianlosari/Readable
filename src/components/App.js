import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../App.css';
import { fetchCategories } from '../actions/categories';
import { fetchPosts, createPost  } from '../actions/posts';
import { connect } from 'react-redux';
import MainView from './MainView';
import CategoryDetail from './CategoryDetail';


class App extends Component {

  render() {
    return (
		<div className="App">
			<Route exact path="/"  render={() =>
				(
				<MainView
				categories={this.props.categories}
				posts={this.props.posts}
				fetchCategories={this.props.fetchCategories}
				fetchPosts={this.props.fetchPosts}
				addPost={this.props.addPost}
				/>
			)}/>

			<Route exact path="/category/:categoryId" render={() =>
				(
					<CategoryDetail
					/>
				
			)}/>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts, comments }, props) {
	console.log(props);
  const categoryArray = [];
  for (let category in categories) {
    categoryArray.push(categories[category]);
  }

  const postArray = []
  for (let post in posts) {
    postArray.push(posts[post]);
  }

  return {
    categories: categoryArray,
    posts: postArray,
    comments
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
  addPost: (post) => dispatch(createPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps, null)(App);
