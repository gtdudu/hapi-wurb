import {
   GET_USER_INFOS_START,
   GET_USER_INFOS_COMPLETE,
   GET_USER_INFOS_ERROR,
   GET_USERS_START,
   GET_USERS_COMPLETE,
   GET_USERS_ERROR,
   DELETE_ACCOUNT_START,
   DELETE_ACCOUNT_COMPLETE,
   DELETE_ACCOUNT_ERROR
 } from '../../actions/account/account.js';

function account(state = {
  data: {},
  ids: [],
  errors: [],
  loading: false,
  firstName: 'feazfzaefaz',
  lastName: '',
  email: '',
  oAuth: []
}, action) {
  switch (action.type) {
  case GET_USERS_START:
    return Object.assign({}, state, {
      loading: true
    })
  case GET_USERS_COMPLETE:
    return Object.assign({}, state, {
      loading: false,
      ...action.accounts
    })
  case GET_USERS_ERROR:
    return Object.assign({}, state, {
      loading: false,
      errors: action.error
    })
  case GET_USER_INFOS_START:
    return Object.assign({}, state, {
      loading: true
    })
  case GET_USER_INFOS_COMPLETE:
    return Object.assign({}, state, {
      loading: false,
      ...action.admin.user
    })
  case GET_USER_INFOS_ERROR:
    return Object.assign({}, state, {
      loading: false,
      errors: action.error
    })
  case DELETE_ACCOUNT_START:
    return Object.assign({}, state, {
      loading: true
    })
  case DELETE_ACCOUNT_COMPLETE:
    return Object.assign({}, state, {
      loading: false
    })
  case DELETE_ACCOUNT_ERROR:
    return Object.assign({}, state, {
      loading: false,
      errors: action.error
    })
  default:
    return state;
  }
}

export default account
