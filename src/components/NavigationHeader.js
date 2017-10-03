import React, { Component } from 'react';
import ListCategories from './ListCategories';
import { Link } from 'react-router-dom';


class NavigationHeader extends Component {

    render() {
        return (
            <div className='navigation-header'>
                <h1><Link to={`/`}>
                    Readable
                </Link></h1>
                
                <ListCategories />
            </div>
        )
    }
}

export default NavigationHeader
