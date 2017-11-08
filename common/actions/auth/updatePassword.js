import {
  whireFetch
} from '../../helpers/whireObjects'
import { loginSuccess } from './authorization.js'

export const UPDATE_PASSWORD_START = "UPDATE_PASSWORD_START";
export const UPDATE_PASSWORD_COMPLETE = "UPDATE_PASSWORD_COMPLETE";
export const UPDATE_PASSWORD_ERROR = "UPDATE_PASSWORD_ERROR";
export const UPDATE_PASSWORD_FORM_UPDATE = "UPDATE_PASSWORD_FORM_UPDATE";

export function updatePasswordStart() {
  return {
    type: UPDATE_PASSWORD_START
  };
}

export function updatePasswordComplete(admin) {
  return { type: UPDATE_PASSWORD_COMPLETE,
    admin
  };
}

export function updatePasswordError(errors) {
  return {
    type: UPDATE_PASSWORD_ERROR,
    errors
  };
}

export function updatePasswordFormUpdate(key, value) {
  return {
    type: UPDATE_PASSWORD_FORM_UPDATE,
    key,
    value
  };
}

export const changePasswordFormUpdate = () => {
  return (dispatch, getState) => {
    const updateData = getState().auth.updatePassword.formData
    console.log(getState());
    const token = getState().auth._store.token
    if (updateData.newPassword !== updateData.newPasswordVerif) { // eslint-disable-line
      dispatch(updatePasswordError('Typed passwords does not match'))
    } else {
      dispatch(updatePasswordStart())
      return whireFetch('/api/passwordUpdate', {
        method: 'POST',
        headers: {
          authorization: token
        },
        body: JSON.stringify({
          currentPassword: updateData.currentPassword,
          newPassword: updateData.newPassword,
          newPasswordVerif: updateData.newPasswordVerif
        })
      })
      .then(res => {
        dispatch(loginSuccess(res.token))
        dispatch(updatePasswordComplete())
      })
      .catch(error => {
        dispatch(updatePasswordError(error.message))
      })
    }
  }
}
