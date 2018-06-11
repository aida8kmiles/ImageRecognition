import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import MyReducer from './MyReducer.js';
var store = null;
if (process.env.NODE_ENV === 'development') {
	store = createStore(combineReducers({MyReducer}), {}, applyMiddleware(thunk, promise()));//createLogger(), 
} else {
	store = createStore(combineReducers({MyReducer}), {}, applyMiddleware(thunk, promise()));
}
export default store; 
