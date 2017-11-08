import fetch from 'isomorphic-fetch'
import mailgun from 'mailgun-js'

const mail = mailgun({
  apiKey: process.env.MAILGUN_API_KEY || 'uiehfzefiuehoa',
  domain: process.env.MAILGUN_DOMAIN || 'huiefuizeha',
});

// /*
//   Use a token received from the client to connect the final user.
//   The token need to be verified by google, then verified by us.
//   The "sub" field is the Google ID of the user.
//   @return User Object : All the Oauth function should return the same object :
//   {
//     Oauth: {
//       id: String,
//       provider: Enum ['google', 'facebook', 'twitter']
//     },
//     email: String,
//     firstName: String,
//     lastName: String
//   }
// */
// export const verifGoogleToken = (token, cb) => {
//   const urlVerif = googleConf.verifyTokenUrl + token
//   fetch(urlVerif, {method: 'GET'})
//   .then(response => response.json().then(res => {
//     if (res.iss && res.sub && res.azp && res.aud && res.iat && res.exp && res.aud === googleConf.clientId) {
//       const userData = {
//         Oauth: {
//           id: res.sub,
//           provider: 'google',
//         },
//         email: res.email,
//         firstName: res.given_name,
//         lastName: res.family_name
//       }
//       cb(null, userData)
//     }
//     else {
//       cb("Token from google is invalid, or not issued by us", null)
//     }
//   })).catch((err) => {
//     console.log('err fetch ', err);
//     cb(err, null)
//   })
// }

export const getAppToken = cb => {
  const appTokenUrl = 'https://graph.facebook.com/v2.8/oauth/access_token?' +
    `client_id=${process.env.FACEBOOK_APP_ID}` +
    `&client_secret=${process.env.FACEBOOK_APP_SECRET}` +
    '&grant_type=client_credentials&format=json'
  ;

  fetch(appTokenUrl, {method: 'GET'})
    .then(response => {
      return response.json();
    })
     .then(res => {
       cb(null, res);
     })
    .catch(err => {
      cb(err, null)
    })
  ;
}

// export const verifFacebookToken = (token, cb) => {
//   getAppToken((err, res) => {
//     if (!err) {
//       const urlVerif = `https://graph.facebook.com/v2.8/debug_token?input_token=${token}&access_token=${res.access_token}`
//       fetch(urlVerif, {method: 'GET'})
//       .then(response => response.json().then(res => {
//         cb(null, res)
//       })).catch((err) => {
//         cb(err, null)
//       })
//     }
//   })
// }
//
//
// export const getFacebookUser = (token, cb) => {
//   verifFacebookToken(token, (err, res) => {
//     if (!err) {
//       if (res.data.is_valid === true) {
//         const getUserUrl = `https://graph.facebook.com/me/?fields=id,first_name,last_name,email&access_token=${token}`
//         fetch(getUserUrl, { method : "GET"})
//         .then(response => response.json().then(res => {
//           const userData = {
//             Oauth: {
//               id: res.id,
//               provider: 'facebook',
//             },
//             email: res.email,
//             firstName: res.first_name,
//             lastName: res.last_name
//           }
//           cb(null, userData)
//         })).catch((err) => {
//           cb(err, null)
//         })
//       }
//     }
//   })
// }


export const shootMailSignup = (user, token) => {
  const textToSend = `Bienvenue chez Whire! Pour valider votre compte veuillez cliquez sur ce lien: ${process.env.WEB_HOST}/validate-account?token=${token}`
  const data = {
    from: 'Whire.me <welcome@whire.me>',
    to: user.email,
    subject: 'Bienvenue!',
    text: textToSend
  };

  mail.messages().send(data, err => {
    if (err) {
      console.log('err shooting MailSignup', err);
    } else {
      console.log('MailSignup have been shooted!');
    }
  });
}

export const shootMailResetPassword = (user, token) => {
  const data = {
    from: 'Whire.me <welcome@whire.me>',
    to: user.email,
    subject: 'Vous avez demandé un nouveau mot de passe',
    text: `Pour créer un nouveau mot de passe suivez ce lien: ${process.env.WEB_HOST}/reset-password?token=${token}`
  }
  mail.messages().send(data, err => {
    if (err) {
      console.log('err shooting resetPasswordmail', err);
    } else {
      console.log('resetPasswordmail have been shooted!');
    }
  })
}
