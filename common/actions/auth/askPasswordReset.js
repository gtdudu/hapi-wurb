import {
  whireFetch
} from '../../helpers/whireObjects'

export const ASK_PASSWORD_RESET_START = "ASK_PASSWORD_RESET_START"
export const ASK_PASSWORD_RESET_COMPLETE = "ASK_PASSWORD_RESET_COMPLETE"
export const ASK_PASSWORD_RESET_ERROR = "ASK_PASSWORD_RESET_ERROR"
export const ASK_PASSWORD_RESET_FORM_UPDATE = "ASK_PASSWORD_RESET_FORM_UPDATE"

export const askPasswordResetStart = () => {
  return {
    type: ASK_PASSWORD_RESET_START
  };
}

export const askPasswordResetComplete = admin => {
  return { type: ASK_PASSWORD_RESET_COMPLETE,
    admin
  };
}

export const askPasswordResetError = errors => {
  return {
    type: ASK_PASSWORD_RESET_ERROR,
    errors
  };
}

export const askPasswordResetFormUpdate = (key, value) => {
  return {
    type: ASK_PASSWORD_RESET_FORM_UPDATE,
    key,
    value
  };
}

export const askPasswordResetSubmit = () => {
  return (dispatch, getState) => {
    dispatch(askPasswordResetStart())
    const email = getState().auth.askPasswordReset.formData.email
    console.log('email', email);
    return whireFetch('/api/askPasswordReset', {
      method: 'post',
      body: JSON.stringify({
        email,
      })
    })
    .then(res => {
      console.log('res resetPassword == ', res);
      dispatch(askPasswordResetComplete())
    })
    .catch(error => {
      dispatch(askPasswordResetError(error.message))
    })
  }
}
