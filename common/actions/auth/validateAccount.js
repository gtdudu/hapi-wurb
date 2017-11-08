import {
  whireFetch
} from '../../helpers/whireObjects'
import {
  loginSuccess
} from './authorization'

export const ACCOUNT_VALIDATE_START = "ACCOUNT_VALIDATE_START"
export const ACCOUNT_VALIDATE_COMPLETE = "ACCOUNT_VALIDATE_COMPLETE"
export const ACCOUNT_VALIDATE_ERROR = "ACCOUNT_VALIDATE_ERROR"
export const ACCOUNT_VALIDATE_TOKEN_UPDATE = "ACCOUNT_VALIDATE_TOKEN_UPDATE"


export const validateAccountStart = () => {
  return {
    type: ACCOUNT_VALIDATE_START
  };
}

export const validateAccountComplete = admin => {
  return { type: ACCOUNT_VALIDATE_COMPLETE,
    admin
  };
}

export const validateAccountTokenUpdate = token => {
  return { type: ACCOUNT_VALIDATE_TOKEN_UPDATE,
    token
  };
}

export const validateAccountError = errors => {
  return {
    type: ACCOUNT_VALIDATE_ERROR,
    errors
  };
}

export const validateAccountRequest = token => {
  return dispatch => {
    dispatch(validateAccountStart())

    return whireFetch('/api/validateAccount', {
      method: 'post',
      body: JSON.stringify({
        token
      })
    })
    .then(res => {
      dispatch(validateAccountComplete())
      dispatch(loginSuccess(res.token))
    })
    .catch(error => {
      dispatch(validateAccountError(error.message))
    })
  }
}
