import {
   PASSWORD_RESET_START,
   PASSWORD_RESET_COMPLETE,
   PASSWORD_RESET_ERROR,
   PASSWORD_RESET_FORM_UPDATE,
   PASSWORD_RESET_TOKEN_UPDATE
 } from '../../actions/auth/passwordReset.js';

function resetPassword(state = {
  errors: [],
  loading: false,
  formData: {},
  token: '',
  done: false
}, action) {
  switch (action.type) {
  case PASSWORD_RESET_START:
    return Object.assign({}, state, {
      loading: true
    })
  case PASSWORD_RESET_COMPLETE:
    return Object.assign({}, state, {
      loading: false,
      done: true
    })
  case PASSWORD_RESET_ERROR:
    return Object.assign({}, state, {
      loading: false,
      done: false,
      errors: [action.errors]
    })
  case PASSWORD_RESET_FORM_UPDATE: {
    const {key, value} = action
    return Object.assign({}, state, {
      formData: {
        ...state.formData,
        [key]: value
      }
    })
  }
  case PASSWORD_RESET_TOKEN_UPDATE: {
    return Object.assign({}, state, {
      token: action.token
    })
  }
  default:
    return state;
  }
}

export default resetPassword
