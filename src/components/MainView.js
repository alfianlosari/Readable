import React, { Component } from 'react';
import NavigationHeader from './NavigationHeader';
import ListPosts from './ListPosts';
import { connect } from 'react-redux';

class MainView extends Component {

    render() {
        return (
            <div className='main-view'>
                <NavigationHeader />
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