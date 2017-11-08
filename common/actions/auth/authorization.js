export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token
  };
}

export function logOutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export const getToken = token => {
  console.log('getToken', token);
  return dispatch => {
    return new Promise(resolve => {
      dispatch(loginSuccess(token))
      resolve();
    });
  }
}
