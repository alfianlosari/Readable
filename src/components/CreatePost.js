import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

class CreatePost extends Component {

    state = {
        title: '',
        body: '',
        author: '',
        category: ''
    }

    componentDidMount() {
        if (this.props.defaultCategory != null) {
            this.setState({
                category: this.props.defaultCategory
            });
        } else {
            const categories = this.props.categories || [];
            if (categories.length > 0) {
                this.setState({
                    category: categories[0].path
                });
            }
        }
    }

    handleChangeSelect = (e) => {
        this.setState({
            category: e.target.value
        });
    }

	submitAddPost = (e) => {
        e.preventDefault();
		this.props.addPost({
			id: uuidv4(),
			timestamp: Date.now(),
			title: this.state.title,
            body: this.state.body,
            author: this.state.author,
			category: this.state.category
        });
        this.props.onSubmit();
	};

    render() {
        return (
            <div className="add-post">
                <h1>Add Post</h1>
                <form onSubmit={this.submitAddPost}>
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
                    <label>Author:
                        <input 
                            type='text' 
                            name='Author'
                            value={this.state.author}
                            onChange={(e) => this.setState({author: e.target.value})}
                        />
                    </label>
                    <br/>

                    {this.props.defaultCategory == null &&
                        <label>Category:
                        <select value={this.state.value} onChange={this.handleChangeSelect}>
                            <option key='none' value="none" disabled>Select Category...</option>
                            {
                                this.props.categories.map((category) => 
                                <option key={category.path} value={category.path}>{category.name}</option>
                                )
                            }
                        </select>
                        </label>
                    }

                
                    <br/>
                    <button className='standard-button add-button submit-button' type='submit'>Submit</button>
                </form>
            </div>
        )
    }


}

export default CreatePost