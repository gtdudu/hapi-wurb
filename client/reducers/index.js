import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app/app.js';

const rootReducer = combineReducers({
  app,
  routing: routerReducer
});

module.exports = rootReducer;
