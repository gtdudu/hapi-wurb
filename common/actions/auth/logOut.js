import {
  whireFetch
} from '../../helpers/whireObjects'

import { logOutSuccess } from './authorization.js'

export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_COMPLETE = "LOGOUT_COMPLETE";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export function logOutStart() {
  return {
    type: LOGOUT_START
  };
}

export function logOutError(errors) {
  return {
    type: LOGOUT_ERROR,
    errors
  };
}

export const logOut = () => {
  return (dispatch, getState) => {
    console.log('start logout in auth actions');
    const token = getState().auth._store.token
    dispatch(logOutStart())
    return whireFetch('/api/logout', {
      method: 'GET',
      headers: {
        authorization: token
      },
    })
    .then(() => {
      dispatch(logOutSuccess())
    })
    .catch(error => {
      dispatch(logOutError(error.message))
    })
  }
}
