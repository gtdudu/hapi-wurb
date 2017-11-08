import { combineReducers } from 'redux';

import askPasswordReset from './askPasswordReset.js';
import _store from './authorization.js';
import emailSignIn from './emailSignIn.js';
import emailSignUp from './emailSignUp.js';
import passwordReset from './passwordReset.js';
import updatePassword from './updatePassword.js';
import validateAccount from './validateAccount.js';

const auth = combineReducers({
  _store,
  emailSignUp,
  emailSignIn,
  askPasswordReset,
  passwordReset,
  updatePassword,
  validateAccount,
});

module.exports = auth;
