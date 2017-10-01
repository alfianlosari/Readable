import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

class CreateComment extends Component {

    state = {
        body: '',
        author: ''
    }

    submitAddComment = (e) => {
        e.preventDefault();
        this.props.addComment({
            id: uuidv4(),
            timestamp: Date.now(),
            body: this.state.body,
            author: this.state.author,
            parentId: this.props.postId
        });
        this.props.onSubmit();
    };

    render() {
        return (
            <div className='Add-Comment'>
                <h1>Add Comment</h1>
                <form onSubmit={this.submitAddComment}>
                    <label>Author:
                        <input 
                            type='text' 
                            name='Author'
                            value={this.state.author}
                            onChange={(e) => this.setState({author: e.target.value})}
                        />
                    </label>
                    <br/>
                    <label>Body:
                        <textarea
                            name='body'
                            value={this.state.body}
                            onChange={(e) => this.setState({body: e.target.value})}>
                        </textarea>
                    </label>
                    <br/>
                    <button className='standard-button add-button submit-button' type='submit'>Submit</button>
                </form>
            </div>
        )
    }


}




export default CreateComment