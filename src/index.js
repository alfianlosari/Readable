import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose} from 'redux';
import { Route } from 'react-router';
import reducers from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import MainView from './components/MainView';
import PostDetail from './components/PostDetail';
import CategoryDetail from './components/CategoryDetail';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

const history = createHistory();
const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = routerMiddleware(history);
const store = createStore(reducers,
    composeEnchancers(
        applyMiddleware(thunk, logger, middleware)
    )   
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path='/' component={MainView}/>
                <Route exact path='/:categoryId' component={CategoryDetail}/>
                <Route exact path='/:categoryId/:postId' component={PostDetail}/>
            </div>

        </ConnectedRouter>

    </Provider>  ,
    document.getElementById('root')
)