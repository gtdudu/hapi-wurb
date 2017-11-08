import {
  whireFetch
} from '../../helpers/whireObjects'

export const PASSWORD_RESET_START = "PASSWORD_RESET_START"
export const PASSWORD_RESET_COMPLETE = "PASSWORD_RESET_COMPLETE"
export const PASSWORD_RESET_ERROR = "PASSWORD_RESET_ERROR"
export const PASSWORD_RESET_FORM_UPDATE = "PASSWORD_RESET_FORM_UPDATE"
export const PASSWORD_RESET_TOKEN_UPDATE = "PASSWORD_RESET_TOKEN_UPDATE"

import { loginSuccess } from './authorization'

export const passwordResetStart = () => {
  return {
    type: PASSWORD_RESET_START
  };
}

export const passwordResetComplete = admin => {
  return { type: PASSWORD_RESET_COMPLETE,
    admin
  };
}

export const passwordResetTokenUpdate = token => {
  return { type: PASSWORD_RESET_TOKEN_UPDATE,
    token
  };
}

export const passwordResetError = errors => {
  return {
    type: PASSWORD_RESET_ERROR,
    errors
  };
}

export const passwordResetFormUpdate = (key, value) => {
  return {
    type: PASSWORD_RESET_FORM_UPDATE,
    key,
    value
  };
}

export const passwordResetSubmit = () => {
  return (dispatch, getState) => {
    dispatch(passwordResetStart())
    const dataPassword = getState().auth.passwordReset
    if (dataPassword.formData.newPassword !== dataPassword.formData.newPasswordVerif) { // eslint-disable-line
      dispatch(passwordResetError("password does not match"))
    } else {
      return whireFetch('/api/passwordReset', {
        method: 'post',
        body: JSON.stringify({
          password: dataPassword.formData.newPassword,
          passwordVerif: dataPassword.formData.newPasswordVerif,
          token: dataPassword.token
        })
      })
      .then(res => {
        dispatch(passwordResetComplete())
        dispatch(loginSuccess(res.token))
      })
      .catch(error => {
        dispatch(passwordResetError(error.message))
      })
    }
  }
}
