import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth'
import account from './account/account.js';

const rootReducer = combineReducers({
  auth,
  account,
  routing: routerReducer
});

module.exports = rootReducer;
