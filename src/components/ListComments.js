import React, { Component } from 'react'
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { fetchPostComments } from '../actions/comments';
import { createComment, removeComment, editComment, voteComment } from '../actions/comments';
import CreateComment from './CreateComment';
import EditComment from './EditComment';
import dateFormatter  from '../utils/date_helper';

class ListComments extends Component {

	state = {
        editModalOpen: false,
        createModalOpen: false,
        updateComment: null,
    }

    componentDidMount() {
        this.props.fetchPostComments(this.props.postId);
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

	openEditModal = (comment) => {
        this.setState({
            editModalOpen: true,
            updateComment: comment
		});
	}

	closeEditModal = () => {
		this.setState({
            editModalOpen: false,
            updateComment: null
		});
	}

    render() {
        return (
            <div className="list-comments">
                <h3>Comments ({this.props.comments.length})</h3>
                <ol className="comments">
                    {
                        this.props.comments.map((comment) => 
                            <li key={comment.id}>
                                    {comment.body} | {comment.voteScore} votes 
                                <div className="comment-subtitle">
                                    Posted {dateFormatter.format(new Date(comment.timestamp))} by {comment.author}
                                </div>

                                <div className="comment-control">
                                    <button className='control-button edit-button' onClick={() => this.openEditModal(comment)}>Edit</button>
                                    <button className='control-button voteup-button' onClick={() => this.props.voteComment(comment.id, 'upVote')}>Vote Up</button>
                                    <button className='control-button votedown-button' onClick={() => this.props.voteComment(comment.id, 'downVote')}>Vote Down</button>
                                    <button className='control-button delete-button' onClick={() => this.props.deleteComment(comment.id)}>Delete</button>
                                </div>
                            </li>
                        )
                    }
                </ol>
                <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={this.state.editModalOpen}
                onRequestClose={this.state.closeEditModal}
                contentLabel='Modal'>
                    <EditComment
                        comment={this.state.updateComment}
                        updateComment={this.props.updateComment}
                        onSubmit={this.closeEditModal}
                    />
                    <button className='standard-button votedown-button' onClick={() => this.closeEditModal()}>Close</button>
                </Modal>


                <button className='standard-button add-button' onClick={() => this.openCreateModal()}>Add Comment</button>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={this.state.createModalOpen}
                    onRequestClose={this.state.closeCreateModal}
                    contentLabel='Modal'>
                        <CreateComment
                            postId={this.props.postId}
                            addComment={this.props.addComment}
                            onSubmit={this.closeCreateModal}
                        />
                        <button className='standard-button votedown-button' onClick={() => this.closeCreateModal()}>Close</button>
                </Modal>

            </div>
        )
    }
}

function sortyByVoteScore(a, b) {
    if (a.voteScore < b.voteScore) {
        return 1;
    } else if (a.voteScore > b.voteScore) {
        return -1;
    } else {
        return 0;
    }
}

function mapStateToProps({ comments }, ownProps) {
    let commentsArray = [];
    for (let comment in comments) {
        let parentId = comments[comment].parentId
        if (parentId === ownProps.postId) {
            commentsArray.push(comments[comment]);
        }
        commentsArray = commentsArray.sort(sortyByVoteScore)
    }

    return {
        comments: commentsArray
	}
}

const mapDispatchToProps = dispatch => ({
    fetchPostComments: (postId) => dispatch(fetchPostComments(postId)),
    addComment: (comment) => dispatch(createComment(comment)),
    updateComment: (comment) => dispatch(editComment(comment)),
    deleteComment: (commentId) => dispatch(removeComment(commentId)),
    voteComment: (commentId, option) => dispatch(voteComment(commentId, option))
});


export default connect(mapStateToProps, mapDispatchToProps)(ListComments)