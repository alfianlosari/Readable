import React, { Component } from 'react';

class EditPost extends Component {

    state = {
        title: '',
        body: ''
    }

    componentDidMount() {
        this.setState({
            title: this.props.post.title,
            body: this.props.post.body
        });
    }

	submitUpdatePost = (e) => {
        e.preventDefault();
		this.props.updatePost({
			id: this.props.post.id,
			title: this.state.title,
            body: this.state.body
        });
        this.props.onSubmit();
	};

    render() {
        return (
            <div className="Edit-Post">
                <h1>Edit Post</h1>
                <form onSubmit={this.submitUpdatePost}>
                    <label>Title:
                        <input 
                            type='text' 
                            name='title' 
                            value={this.state.title}
                            onChange={(e) => this.setState({title: e.target.value})}
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

export default EditPost