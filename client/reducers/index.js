import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import test from './test/test.js';

const rootReducer = combineReducers({
  routing: routerReducer
});

module.exports = rootReducer;
