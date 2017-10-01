import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchPostComments } from '../actions/comments';
import { connect } from 'react-redux';
import dateFormatter  from '../utils/date_helper';


class PostList extends Component {

    componentDidMount() {
        this.props.fetchPostComments(this.props.post.id);
    }


    render() {
        const post = this.props.post;
        return (
            <li> 
                <Link to={`/post/${post.id}`}>
                    {post.title} | {post.category} | {post.voteScore} votes 
                </Link>
                <div className='post-subtitle'>
                    Posted {dateFormatter.format(new Date(post.timestamp))} by {post.author} | {this.props.comments.length} comments
                </div>
                <div className='post-control'>
                <button className='control-button edit-button' onClick={() => this.props.openEditModal(post)}>Edit</button>
                <button className='control-button voteup-button' onClick={() => this.props.votePost(post.id, 'upVote')}>Vote Up</button>
                <button className='control-button votedown-button' onClick={() => this.props.votePost(post.id, 'downVote')}>Vote Down</button>
                <button className='control-button delete-button' onClick={() => this.props.deletePost(post.id)}>Delete</button>
                </div>
            </li>
        )
    }


}

function mapStateToProps({ comments }, ownProps) {
    let commentsArray = [];
    for (let comment in comments) {
        let parentId = comments[comment].parentId
        if (parentId === ownProps.post.id) {
            commentsArray.push(comments[comment]);
        }
    }

    return {
        comments: commentsArray
	}
}

const mapDispatchToProps = dispatch => ({
    fetchPostComments: (postId) => dispatch(fetchPostComments(postId))
});


export default connect(mapStateToProps, mapDispatchToProps)(PostList)
