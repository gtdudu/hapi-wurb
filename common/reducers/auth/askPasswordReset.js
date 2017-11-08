import {
   ASK_PASSWORD_RESET_START,
   ASK_PASSWORD_RESET_COMPLETE,
   ASK_PASSWORD_RESET_ERROR,
   ASK_PASSWORD_RESET_FORM_UPDATE
 } from '../../actions/auth/askPasswordReset.js';

function askResetPassword(state = {
  errors: [],
  loading: false,
  formData: {},
  done: false
}, action) {
  switch (action.type) {
  case ASK_PASSWORD_RESET_START:
    return Object.assign({}, state, {
      loading: false,
      done: false
    })
  case ASK_PASSWORD_RESET_COMPLETE:
    return Object.assign({}, state, {
      loading: false,
      done: true
    })
  case ASK_PASSWORD_RESET_ERROR:
    return Object.assign({}, state, {
      errors: [action.errors],
      loading: false
    })
  case ASK_PASSWORD_RESET_FORM_UPDATE: {
    const {key, value} = action
    return Object.assign({}, state, {
      formData: {
        ...state.formData,
        [key]: value
      }
    })
  }
  default:
    return state;
  }
}

export default askResetPassword
