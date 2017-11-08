import fetch from 'isomorphic-fetch'
import IS_BROWSER from '../constants/environment';

export const whireFetch = (endpoint, config, token) => {
  return new Promise((resolve, reject) => {
    config.credentials = 'same-origin'
    const url = IS_BROWSER ? endpoint : `http://localhost:8000${endpoint}`;

    if (token) {
      config.headers = {
        Authorization: token
      };
    }

    fetch(url, config)
    .then(response => {
      response.json()
      .then(res => {
        if (res.statusCode >= 400) {
          reject({
            code: res.statusCode,
            message: res.message,
            from: endpoint
          })
        } else {
          resolve(res)
        }
      })
    })
    .catch(error => {
      reject({
        code: 500,
        message: error.message,
        from: endpoint
      })
    })
  })
}
