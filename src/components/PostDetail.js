import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/posts';
import ListComments from './ListComments';
import { editPost, votePost, removePost  } from '../actions/posts';
import Modal from 'react-modal';
import EditPost from './EditPost';
import dateFormatter  from '../utils/date_helper';


class PostDetail extends Component {

    state = {
        editModalOpen: false
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.postId);
    }

    openEditModal = () => {
		this.setState({
			editModalOpen: true
		});
	}

	closeEditModal = () => {
		this.setState({
			editModalOpen: false
		});
    }
    

    render() {
        const post = this.props.post;

        return (
            <div className="post-detail">
                   
                {post != null &&
                    <div>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        <div className='post-subtitle'>
                            Posted {dateFormatter.format(new Date(post.timestamp))} by {post.author} | {post.category} | {post.voteScore} votes 
                        </div>
                        <div className='post-control'>
                            <button className='control-button edit-button' onClick={() => this.openEditModal(post)}>Edit</button>
                            <button className='control-button voteup-button'  onClick={() => this.props.votePost(post.id, 'upVote')}>Vote Up</button>
                            <button className='control-button votedown-button' onClick={() => this.props.votePost(post.id, 'downVote')}>Vote Down</button>
                            <button className='control-button delete-button' onClick={() => this.props.deletePost(post.id)}>Delete</button>
                        </div>
                        <Modal
                        className='modal'
                        overlayClassName='overlay'
                        isOpen={this.state.editModalOpen}
                        onRequestClose={this.state.closeEditModal}
                        contentLabel='Modal'>
                            <EditPost
                                post={post}
                                updatePost={this.props.updatePost}
                            />
                            <button onClick={() => this.closeEditModal()}>Close</button>
                        </Modal>
                        <ListComments 
                            postId={post.id}
                 />
                    </div>
                    
                }

           
                { post == null &&
                    <h1>Post is not available anymore</h1>
                }

            </div>
        )
    }
}

function mapStateToProps({ posts, comments }, ownProps) {
    return {
        post: posts[ownProps.match.params.postId]
	}
}

const mapDispatchToProps = dispatch => ({
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    updatePost: (post) => dispatch(editPost(post)),
    votePost: (postId, option) => dispatch(votePost(postId, option)),
    deletePost: (postId) => dispatch(removePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)