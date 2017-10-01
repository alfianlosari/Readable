import React, { Component } from 'react';
import Modal from 'react-modal';
import EditPost from './EditPost';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';
import { fetchCategoryPosts, fetchPosts, createPost, removePost, editPost, votePost } from '../actions/posts';
import PostList from './PostList';
const SORT_BY_VOTE_SCORE = 'voteScore';
const SORT_BY_TIMESTAMP = 'timestamp';

class ListPosts extends Component {

    state = {
		sortBy: SORT_BY_VOTE_SCORE,
		editModalOpen: false,
        createModalOpen: false,
        updatePost: null,
    }
    
    componentDidMount() {
        const categoryId = this.props.categoryId;
        if (categoryId == null) {
            this.props.fetchPosts();
        } else {
            this.props.fetchCategoryPosts(categoryId);            
        }

	}

	openCreateModal = () => {
        this.setState({
			createModalOpen: true
		});
    }

    closeCreateModal = () => {
        this.setState({
			createModalOpen: false
		});
    }

	
	openEditModal = (post) => {
        this.setState({
            editModalOpen: true,
            updatePost: post
		});
	}

	closeEditModal = () => {
		this.setState({
            editModalOpen: false,
            updatePost: null
		});
	}

	sortyByVoteScore = (a, b) => {
		if (a.voteScore < b.voteScore) {
			return 1;
		} else if (a.voteScore > b.voteScore) {
			return -1;
		} else {
			return 0;
		}
	}

	sortByTimestamp = (a, b) => {
		if (a.timestamp < b.timestamp) {
			return 1;
		} else if (a.timestamp > b.timestamp) {
			return -1;
		} else {
			return 0;
		}
	}

	sortedByPosts = () => {
		switch(this.state.sortBy) {
			case SORT_BY_VOTE_SCORE:
				return this.props.posts.sort(this.sortyByVoteScore);
			case SORT_BY_TIMESTAMP:
				return this.props.posts.sort(this.sortByTimestamp);
			default:
				return this.props.posts;
		}
	}

    render() {
        return (
            <div className="list-posts">
                <h3>Posts</h3>
                <div className="sort-by-changer">
                <label className='sort-label'>Sort By: </label>
                <select value={this.state.sortBy} onChange={(e) => {
                    this.setState({
                        sortBy: e.target.value
                    })
                }}>
                    <option value="none" disabled>Sort By...</option>
                    <option value={SORT_BY_VOTE_SCORE}>Vote</option>
                    <option value={SORT_BY_TIMESTAMP}>Timestamp</option>
                </select>
                </div>

                <ol className="posts"> 
                    {this.sortedByPosts().map((post) => 
                        <PostList  
                            key={post.id}
                            post={post}
                            openEditModal={this.openEditModal}
                            votePost={this.props.votePost}
                            deletePost={this.props.deletePost}
                        />
                    )}
                </ol>
				<Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={this.state.editModalOpen}
                onRequestClose={this.state.closeEditModal}
                contentLabel='Modal'>
                    <EditPost
                        post={this.state.updatePost}
                        updatePost={this.props.updatePost}
                        onSubmit={this.closeEditModal}
                    />
                    <button className='standard-button votedown-button' onClick={() => this.closeEditModal()}>Close</button>
                </Modal>

				<button className='standard-button add-button' onClick={() => this.openCreateModal()}>Add Post</button>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={this.state.createModalOpen}
                    onRequestClose={this.state.closeCreateModal}
                    contentLabel='Modal'>
                        <CreatePost
                            categories={this.props.categories}
                            addPost={this.props.addPost}
							defaultCategory={this.props.categoryId}
                            onSubmit={this.closeCreateModal}
                        />
                        <button  className='standard-button votedown-button' onClick={() => this.closeCreateModal()}>Close</button>
                </Modal>

            </div>
        )
    }
}

function mapStateToProps({ posts }, ownProps) {
    const categoryId = ownProps.categoryId;
    const postArray = [];
    
    if (categoryId == null) {
        for (let post in posts) {
            const postObject = posts[post];
            postArray.push(postObject);   
        }
    } else {
        for (let post in posts) {
            const postObject = posts[post];
            if (postObject.category === categoryId) {
                postArray.push(postObject);
            }
        }
    }
    return {
        posts: postArray
    }


}

const mapDispatchToProps = dispatch => ({
    fetchCategoryPosts: (categoryId) => dispatch(fetchCategoryPosts(categoryId)),
    fetchPosts: () => dispatch(fetchPosts()),
	addPost: (post) => dispatch(createPost(post)),
	updatePost: (post) => dispatch(editPost(post)),
	deletePost: (postId) => dispatch(removePost(postId)),
	votePost: (postId, option) => dispatch(votePost(postId, option))
});


export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
