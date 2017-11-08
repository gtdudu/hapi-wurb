import {
   EMAIL_SIGN_IN_START,
   EMAIL_SIGN_IN_COMPLETE,
   EMAIL_SIGN_IN_ERROR,
   EMAIL_SIGN_IN_FORM_UPDATE
 } from '../../actions/auth/emailSignIn.js';

function emailSignUp(state = {
  errors: [],
  loading: false,
  formData: {}
}, action) {
  switch (action.type) {
  case EMAIL_SIGN_IN_START:
    return Object.assign({}, state, {
      loading: true
    })
  case EMAIL_SIGN_IN_COMPLETE:
    return Object.assign({}, state, {
      loading: false
    })
  case EMAIL_SIGN_IN_ERROR:
    return Object.assign({}, state, {
      errors: [action.errors]
    })
  case EMAIL_SIGN_IN_FORM_UPDATE: {
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

export default emailSignUp
