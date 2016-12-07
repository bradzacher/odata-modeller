import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import loggerMiddleware from './loggerMiddleware';

// load the reducers
import metadata from './reducers/metadata';

const DEBUG = false;

// build the store
const middleware = [thunk];
if (DEBUG) {
    middleware.push(loggerMiddleware);
}
const reducer = combineReducers({ metadata });
const store = createStore(reducer, applyMiddleware(...middleware));
export default store;
