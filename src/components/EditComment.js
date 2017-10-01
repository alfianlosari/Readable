import React, { Component } from 'react';

class EditComment extends Component {

    state = {
        body: '',
        author: ''
    }
    
    componentDidMount() {
        this.setState({
            body: this.props.comment.body
        });
    }

    submitUpdateComment = (e) => {
        e.preventDefault();
        this.props.updateComment({
            id: this.props.comment.id,
            timestamp: Date.now(),
            body: this.state.body
        });
        this.props.onSubmit();        
    };

    render() {
        return (
            <div className='Edit-Comment'>
                <h1>Edit Comment</h1>
                <form onSubmit={this.submitUpdateComment}>
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

export default EditComment