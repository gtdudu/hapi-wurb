import {
   UPDATE_PASSWORD_START,
   UPDATE_PASSWORD_COMPLETE,
   UPDATE_PASSWORD_ERROR,
   UPDATE_PASSWORD_FORM_UPDATE
 } from '../../actions/auth/updatePassword.js';

function updatePassword(state = {
  errors: [],
  loading: false,
  formData: {}
}, action) {
  switch (action.type) {
  case UPDATE_PASSWORD_START:
    return Object.assign({}, state, {
      loading: true
    })
  case UPDATE_PASSWORD_COMPLETE:
    return Object.assign({}, state, {
      loading: false
    })
  case UPDATE_PASSWORD_ERROR:
    return Object.assign({}, state, {
      errors: action.errors
    })
  case UPDATE_PASSWORD_FORM_UPDATE: {
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

export default updatePassword
