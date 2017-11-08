import Bcrypt from 'bcrypt'
import Boom from 'boom'
import { v4 } from 'uuid'
import {redisClient} from '../../config/redis'

import { Recruiter } from './../../models/recruiter'
import { createToken, getJwtData } from '../../authentification';
import Jwt from 'jsonwebtoken'

import {
  // verifGoogleToken,
  // getFacebookUser,
  shootMailSignup
} from './helpers'

const cookieOptions = {
  ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
  encoding: 'none',    // we already used JWT to encode
  isSecure: false,      // warm & fuzzy feelings
  isHttpOnly: true,    // prevent client alteration
  clearInvalid: false, // remove invalid cookies
  strictHeader: true,  // don't allow violations of RFC 6265
  path: '/'            // set the cookie for all routes
}

export const login = (request, reply) => {
  return Recruiter.findOne({email: request.payload.email})
  .then(user => {
    console.log("user from login", user);

    if (user === null) {
      return reply(Boom.badData('User do not exist'));
    }

    // if (user.accountValid !== true) {
    //   return reply(Boom.badData('Account is not valid, please check your mail.'));
    // }

    Bcrypt.compare(request.payload.password, user.password, (err, res) => {
      if (err) {
        return reply(Boom.badImplementation('fail to compare passwords'));
      }

      if (res !== true) {
        return reply(Boom.badData('email or password don\'t match')); // eslint-disable-line
      }

      createToken(user)
        .then(token => {
          return reply({text: "login done!", token})
            .header("Authorization", token)
            .state("token", token, cookieOptions)
        })
        .catch(() => {
          return reply(Boom.badImplementation('Token creation Failed.'))
        })
      ;
    });
  })
  .catch(err => {
    console.log(err);
    return reply(Boom.badImplementation('Error while searching for user'));
  })
}

export const signup = (request, reply) => {
  const { password, confirmPassword } = request.payload

  if (password !== confirmPassword) {
    return reply(Boom.badData("Your passwords don't match."))
  }

  // Check if user already exists with this email
  Recruiter.findOne({email: request.payload.email}, 'email', (err, user) => {
    if (err) {
      console.log(err)
      return reply(Boom.badImplementation('Error while searching for user')) // 500
    }

    if (user) return reply(Boom.conflict('User already exists')) // 409

    const salt = Bcrypt.genSaltSync(10) // eslint-disable-line
    const hash = Bcrypt.hashSync(request.payload.password, salt) // eslint-disable-line

    const whireId = v4()

    new Promise((resolve, reject) => {
      Recruiter.create(Object.assign({}, {
        email: request.payload.email,
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        password: hash,
        whireId,
        accountValid: false
      }), (err, user) => {
        if (err) {
          console.log(err)
          return reject(Boom.badImplementation('Error when creating new User'))
        }
        return resolve(user)
      })
    })
    .then(user => {
      createToken(user)
      .then(token => {
        request.yar.set('whireCookie', token)
        createToken(user, false)
        .then(tokenMail => {
          const redisKey = `signupJWT:${tokenMail}`
          redisClient.set(user.whireId, {
							redisKey,
							scope: user.scope,
					});
          redisClient.expire(redisKey, 24 * 60 * 60) // Expire in 1 day
          shootMailSignup(user.whireId, tokenMail)
          return reply({
            message: "account has been created",
            token
          })
        })
        .catch(() => {
          return reply(Boom.badImplementation('Error creating token'))
        })
      })
      .catch(() => {
        return reply(Boom.badImplementation('Error creating token'))
      })
    })
    .catch(err => {
      console.log(err);
      return reply(err)
    })
  })
}

export const logout = (request, reply) => {
  const decoded = Jwt.decode(request.headers.authorization, process.env.JWT_SECRET);
  let session;

  console.log("[logout] - decoded: ", decoded);
  redisClient.get(decoded.id, (rediserror, redisreply) => {
    if (rediserror) {
      console.log(rediserror);
    }

    session = JSON.parse(redisreply)
    console.log(session);
    // session.valid = false;
    // session.ended = new Date().getTime();
    // redisClient.set(session.id, JSON.stringify(session));
    reply({text: 'You are succesfully log out and your token has been invalidated on Redis Store'})
    .unstate('token', cookieOptions);
  })
}
//
// /**
// * @api {post} /api/verifyToken/:provider/:signup? verifyOauthToken
// * @apiGroup Authentification
// * @apiName verifyOauthToken
// *
// * @apiDescription Verify a token sent by a third entity like fb, twitter or google,
// * then log-in or (signup and log-in) the associated user
// *
// * @apiVersion 0.0.1
// * @apiParam {string} provider Mandatory provider
// * @apiParam {string} [signup] Optional signup, if not set just try to login.
// *
// * @apiUse LoginReturn
// *
// */
// export const verifyToken = (request, reply) => {
//   const payload = JSON.parse(request.payload)
//   const provider = request.params.provider
//   const isSigningUp = request.params.signup ? true : false
//
//   let verif = false
//   switch (provider) {
//   case 'google':
//     verif = verifGoogleToken
//     break;
//   case 'facebook':
//     verif = getFacebookUser
//     break;
//   }
//
//   verif(payload.token, (err, userData) => {
//     if (err) reply({error: err})
//     else {
//       userData.whireId = v4()
//       User.findOne({email: userData.email}, (err, user) => {
//         if (err) reply(Boom.badImplementation('error fetching user'))
//         else if (user) {
//           createToken(user)
//           .then((token) => {
//             request.yar.set('whireCookie', token)
//             reply({text: 'logged in', token})
//           })
//           .catch(() => {
//             reply(Boom.badImplementation('error creating token'))
//           })
//         }
//         else if (isSigningUp) {
//           // create user then create Token
//           User.create(userData, (err, newUser) => {
//             if (err) {
//               console.error('saving user', err)
//               reply(Boom.badImplementation('error creating user'))
//             }
//             else {
//               createToken(newUser)
//               .then((token) => {
//                 request.yar.set('whireCookie', token)
//                 reply({text: 'signUP done and logged in :)', token})
//               })
//               .catch(() => {
//                 reply(Boom.badImplementation('error creating token'))
//               })
//             }
//           })
//         }
//         else {
//           reply(Boom.badData('user not founded, and not signing up.'))
//         }
//       })
//     }
//   })
// }

/**
* @api {post} /api/validateToken Validate signup Token
* @apiGroup Authentification
* @apiName validateToken
*
* @apiDescription Validate a token sent by mail on sign up
*
* @apiVersion 0.0.1
* @apiParam {string} token token received by mail
*
* @apiSuccess {String} text user data
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "text": 'Your account has been validated',
*     }
* @apiUse BoomErrors
*/
export const validateToken = (request, reply) => {
  /*
  verify namespaced token in redis
  update user Account to valideAccount
  destroy redis token
  login ?
  */
  const redisKey = `signupJWT:${request.payload.token}`
  redisClient.get(redisKey, (err, result) => {
    if (err) reply(Boom.badImplementation('Error fetching from redis'))
    else if (result === null) reply(Boom.badData('Token not found in redis'))
    else {
      const dataFromToken = getJwtData(request.payload.token)
      Recruiter.findOne({email: dataFromToken.email, whireId: dataFromToken.whireId}, (err, user) => {
        if (err) {
					return reply(Boom.badImplementation('error fetching user'))
				}

				if (user === null) {
					return reply(Boom.badData('no user with such data'));
				}

        user.accountValid = true
        user.save((err, updatedUser) => {
	        if (err) {
						return reply(Boom.badImplementation('error saving user'))
					}
          redisClient.del(redisKey)
          createToken(updatedUser)
          .then(token => { // eslint-disable-line
            reply({text: 'your account is now valid!', token})
          })
          .catch(() => { // eslint-disable-line
            reply(Boom.badImplementation('error creating token'))
          })
      })
      })
    }
  })
}
