import {
  whireFetch
} from '../../helpers/whireObjects'

import { loginSuccess } from './authorization.js'

export const EMAIL_SIGN_IN_START = "EMAIL_SIGN_IN_START"
export const EMAIL_SIGN_IN_COMPLETE = "EMAIL_SIGN_IN_COMPLETE"
export const EMAIL_SIGN_IN_ERROR = "EMAIL_SIGN_IN_ERROR"
export const EMAIL_SIGN_IN_FORM_UPDATE = "EMAIL_SIGN_IN_FORM_UPDATE"

export const emailSignInStart = () => {
  return {
    type: EMAIL_SIGN_IN_START,

  };
}

export const emailSignInComplete = () => {
  return { type: EMAIL_SIGN_IN_COMPLETE,
  };
}

export const emailSignInError = errors => {
  return {
    type: EMAIL_SIGN_IN_ERROR,
    errors
  };
}

export const emailSignInFormUpdate = (key, value) => {
  return {
    type: EMAIL_SIGN_IN_FORM_UPDATE,
    key,
    value
  };
}


export const emailSignIn = () => {
  return (dispatch, getState) => {
    dispatch(emailSignInStart())
    const loginData = getState().auth.emailSignIn.formData
    console.log('fetch login route', loginData);
    return whireFetch('/api/login', {
      method: 'post',
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password
      })
    })
    .then(res => {
      dispatch(loginSuccess(res.token))
      dispatch(emailSignInComplete())
    })
    .catch(error => {
      dispatch(emailSignInError(error.message))
    })
  };
}
