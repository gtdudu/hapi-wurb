import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
 } from '../../actions/auth/authorization.js';
function authorization(state = {
  token: '',
  loggedIn: false
}, action) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    return Object.assign({}, state, {
      token: action.token,
      loggedIn: true
    })
  case LOGOUT_SUCCESS:
    return Object.assign({}, state, {
      token: "",
      loggedIn: false
    })
  default:
    return state;
  }
}

export default authorization
