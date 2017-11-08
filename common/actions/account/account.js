import {
  whireFetch
} from '../../helpers/whireObjects';
import { logOutSuccess } from './../auth/authorization.js'

export const GET_USER_INFOS_START = "GET_USER_INFOS_START"
export const GET_USER_INFOS_COMPLETE = "GET_USER_INFOS_COMPLETE"
export const GET_USER_INFOS_ERROR = "GET_USER_INFOS_ERROR"

export const DELETE_ACCOUNT_START = "DELETE_ACCOUNT_START"
export const DELETE_ACCOUNT_COMPLETE = "DELETE_ACCOUNT_COMPLETE"
export const DELETE_ACCOUNT_ERROR = "DELETE_ACCOUNT_ERROR"

export const GET_USERS_START = "GET_USERS_START"
export const GET_USERS_COMPLETE = "GET_USERS_COMPLETE"
export const GET_USERS_ERROR = "GET_USERS_ERROR"

export const getAccountStart = () => {
  return {
    type: GET_USER_INFOS_START
  };
}

export const getAccountsStart = () => {
  return {
    type: GET_USERS_START
  };
}

export const getAccountComplete = admin => {
  return { type: GET_USER_INFOS_COMPLETE,
    admin
  };
}

export const getAccountsComplete = accounts => {
  return { type: GET_USERS_COMPLETE,
    accounts
  };
}

export const getAccountError = errors => {
  return {
    type: GET_USER_INFOS_ERROR,
    errors
  };
}

export const getAccountsError = errors => {
  return {
    type: GET_USERS_ERROR,
    errors
  };
}

export const deleteAccountStart = () => {
  return {
    type: DELETE_ACCOUNT_START
  };
}

export const deleteAccountComplete = admin => {
  return { type: DELETE_ACCOUNT_COMPLETE,
    admin
  };
}

export const deleteAccountError = errors => {
  return {
    type: DELETE_ACCOUNT_ERROR,
    errors
  };
}

export const getAccounts = () => {
  return (dispatch, getState) => {
    if (getState().account.ids.length) {
      return;
    }
    dispatch(getAccountsStart())
    const token = getState().auth._store.token
    return whireFetch('/api/accounts', {
      method: 'get',
      headers: {
        authorization: token
      }
    })
    .then(accounts => {
      dispatch(getAccountsComplete(accounts))
    })
    .catch(error => {
      console.log('error accounts info', error, error.message);
      dispatch(getAccountsError(error.message))
    })
  }
}


export const getAccount = () => {
  return (dispatch, getState) => {
    if (getState().account.email) {
      return;
    }
    dispatch(getAccountStart())
    const token = getState().auth._store.token
    return whireFetch('/api/account/me', {
      method: 'get',
      headers: {
        authorization: token
      }
    })
    .then(admin => {
      dispatch(getAccountComplete(admin))
    })
    .catch(error => {
      console.log('error admin info', error, error.message);
      dispatch(getAccountError(error.message))
    })
  }
}

export const deleteAccount = () => {
  return (dispatch, getState) => {
    dispatch(deleteAccountStart())
    const token = getState().auth._store.token
    return whireFetch('/api/account', {
      method: 'delete',
      headers: {
        authorization: token
      }
    })
    .then(response => {
      console.log('response del account', response);
      dispatch(deleteAccountComplete())
      dispatch(logOutSuccess())
    })
    .catch(errors => {
      console.log('errors del account', errors);
      dispatch(deleteAccountError(errors))
    })
  }
}
