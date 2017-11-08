import {
   EMAIL_SIGN_UP_START,
   EMAIL_SIGN_UP_COMPLETE,
   EMAIL_SIGN_UP_ERROR,
   EMAIL_SIGN_UP_FORM_UPDATE
 } from '../../actions/auth/emailSignUp.js';

const initialState = {
  errors: [],
  loading: false,
  formData: {}
}

function emailSignUp(state = initialState, action) {
  switch (action.type) {
  case EMAIL_SIGN_UP_START:
    return Object.assign({}, state, {

    })
  case EMAIL_SIGN_UP_COMPLETE:
    return initialState
  case EMAIL_SIGN_UP_ERROR:
    return Object.assign({}, state, {
      errors: [action.errors]
    })
  case EMAIL_SIGN_UP_FORM_UPDATE: {
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
