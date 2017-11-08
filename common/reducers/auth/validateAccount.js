import {
  ACCOUNT_VALIDATE_START,
  ACCOUNT_VALIDATE_COMPLETE,
  ACCOUNT_VALIDATE_ERROR,
  ACCOUNT_VALIDATE_TOKEN_UPDATE
} from '../../actions/auth/validateAccount.js';

function validateAccount(state = {
  errors: [],
  loading: false,
  done: false,
  token: ''
}, action) {
  switch (action.type) {
  case ACCOUNT_VALIDATE_START:
    return Object.assign({}, state, {
      loading: true
    })
  case ACCOUNT_VALIDATE_COMPLETE:
    return Object.assign({}, state, {
      loading: false,
      done: true
    })
  case ACCOUNT_VALIDATE_ERROR:
    return Object.assign({}, state, {
      loading: false,
      errors: [action.errors]
    })
  case ACCOUNT_VALIDATE_TOKEN_UPDATE:
    return Object.assign({}, state, {
      token: action.token
    })
  default:
    return state;
  }
}

export default validateAccount
