import React, { Component } from 'react'
import { fetchCategories } from '../actions/categories';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ListCategories extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        return (
            <div className="list-categories">
                <h3>Categories</h3>
                <ol className='Category-List'>
                    {
                        this.props.categories.map((category) => 
                            <li key={category.path}>
                                <Link to={`/category/${category.path}`}>
                                    {category.name}
                                </Link>
                            </li>
                        )
                    }
                </ol>
            </div>
        )
    }
}

function mapStateToProps({ categories}, props) {
    const categoryArray = [];
    for (let category in categories) {
        categoryArray.push(categories[category]);
    }

    return {
        categories: categoryArray
    }
}
  
const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps, null)(ListCategories);
  
