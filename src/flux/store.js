import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import loggerMiddleware from './loggerMiddleware';

// load the reducers
import metadata from './reducers/metadata';

// build the store
const reducer = combineReducers({ metadata });
const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunk));
export default store;
