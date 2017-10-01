import React, { Component } from 'react';
import ListCategories from './ListCategories';
import ListPosts from './ListPosts';
import { connect } from 'react-redux';

class MainView extends Component {

    render() {
        return (
            <div className='main-view'>
                <h1>Readable</h1>
                <ListCategories />
                <ListPosts
                    categories={this.props.categories}
                />
            </div>
        )
    }
}

function mapStateToProps({ categories}) {
  const categoryArray = [];
  for (let category in categories) {
    categoryArray.push(categories[category]);
  }

  return {
    categories: categoryArray
  }
}

export default connect(mapStateToProps)(MainView);