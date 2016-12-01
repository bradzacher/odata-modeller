import { createStore, combineReducers, applyMiddleware } from 'redux';

import loggerMiddleware from './loggerMiddleware';

function uploadFile(state = null, action) {
    if (action.file) {
        // todo....
    }
}

const reducer = combineReducers({ uploadFile });
const store = createStore(reducer, applyMiddleware(loggerMiddleware));
export default store;
