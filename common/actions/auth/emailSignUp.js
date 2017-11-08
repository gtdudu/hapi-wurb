import {
  whireFetch
} from '../../helpers/whireObjects'

import { loginSuccess } from './authorization.js'

export const EMAIL_SIGN_UP_START = "EMAIL_SIGN_UP_START";
export const EMAIL_SIGN_UP_COMPLETE = "EMAIL_SIGN_UP_COMPLETE";
export const EMAIL_SIGN_UP_ERROR = "EMAIL_SIGN_UP_ERROR";
export const EMAIL_SIGN_UP_FORM_UPDATE = "EMAIL_SIGN_UP_FORM_UPDATE";

export const emailSignUpStart = () => {
  return {
    type: EMAIL_SIGN_UP_START
  };
}

export const emailSignUpComplete = () => {
  return { type: EMAIL_SIGN_UP_COMPLETE
  };
}

export const emailSignUpError = errors => {
  return {
    type: EMAIL_SIGN_UP_ERROR,
    errors
  };
}

export const emailSignUpFormUpdate = (key, value) => {
  return {
    type: EMAIL_SIGN_UP_FORM_UPDATE,
    key,
    value
  };
}

export const emailSignUpSubmit = () => {
  return (dispatch, getState) => {
    const registerData = getState().auth.emailSignUp.formData

    dispatch(emailSignUpStart());
    return whireFetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: registerData.email,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
        firstName: registerData.firstName,
        lastName: registerData.lastName
      })
    })
    .then(res => {
      dispatch(loginSuccess(res.token))
      dispatch(emailSignUpComplete())
    })
    .catch(error => {
      dispatch(emailSignUpError(error.message))
    })
  }
}

//
// export function emailSignUp(body, endpointKey) {
//   return dispatch => {
//     dispatch(emailSignUpStart(endpointKey));
//
//     return fetch(getEmailSignUpUrl(endpointKey), {
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//       },
//       method: "post",
//       body: JSON.stringify(extend(body, {
//         confirm_success_url: getConfirmationSuccessUrl()
//       }))
//     })
//       .then(parseResponse)
//       .then(({data}) => dispatch(emailSignUpComplete(data, endpointKey)))
//       .catch(({errors}) => {
//         dispatch(emailSignUpError(errors, endpointKey))
//         throw errors;
//       });
//   };
// }
//
