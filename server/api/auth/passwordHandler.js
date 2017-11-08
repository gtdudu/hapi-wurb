import Bcrypt from 'bcrypt'
import Boom from 'boom'

import { Recruiter } from './../../models/recruiter'
import { redisClient } from './../../config/redis'
import {
  createToken,
  getJwtData
} from '../../authentification';
import { shootMailResetPassword } from './helpers'

/**
* @api {post} /api/passwordUpdate Update user password from form
* @apiGroup Authentification
* @apiName passwordUpdate
*
* @apiDescription On user request change password.
*
* @apiVersion 0.0.1
* @apiParam {string} currentPassword Current User Password
* @apiParam {string} newPassword new User Password
*
* @apiUse LoginReturn
*
*/
export const passwordUpdate = (request, reply) => {
  if (request.payload.newPassword !== request.payload.newPasswordVerif) {
    reply(Boom.badData('new passwords does not match.'))
  }
  const dataIntoToken = getJwtData(request.headers.authorization)
  console.log("[passwordHandler] - dataIntoToken: ", dataIntoToken);

  /*
  1) Get user from whireID,
  2) Control currentPassword is right
  3) update user.
  4) shoot mail ?
  */
  Recruiter.findOne({ email: dataIntoToken.email}, (err, user) => { // 1)
    if (err || !user) {
		return reply(Boom.badImplementation('Error fecthing user'))
	}

	console.log("[passwordHandler] user from passwordUpdate");
	Bcrypt.compare(request.payload.currentPassword, user.password, (err, res) => { // 2)
		if (err) {
      return reply(Boom.badImplementation('Error comparing passwords'))
    }

		if (!res) {
      return reply(Boom.badData("Your passwords don't match."));
    }

		  // 3)
		  const salt = Bcrypt.genSaltSync(10);
		  const hash = Bcrypt.hashSync(request.payload.newPassword, salt);
		  user.password = hash
		  user.save((err, updatedUser) => {
		    if (err) {
          return reply(Boom.badImplementation('Error updating user'))
        }

        createToken(updatedUser)
		      .then(token => {
		        return reply({text: "password has been updated", token})
		      })
		      .catch(() => {
            return reply(Boom.badImplementation('error creating token'))
          })
        ;
		  });
	})
  })
}

/**
* @api {post} /api/askPasswordReset Shoot resetPassword mail
* @apiGroup Authentification
* @apiName askPasswordReset
*
* @apiDescription On user request generate a expirying token to reset a password.
* And send a mail with a link allowing to reset the password
*
* @apiVersion 0.0.1
* @apiParam {string} email Current User email
*
* @apiSuccess {String} text user success
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "text": 'mail sent',
*     }
* @apiUse BoomErrors
*
*/
export const askPasswordRest = (request, reply) => {
  /*
   check user email exists
   generate resetPassword JWT
   store resetPassword JWT in redis (with a timeout and a namespace)
   generate mail with a link included the JWT
   say ok to client.
   link look like : https://whire.me/reset-password?token=adcvertse54z.ae4aea...
  */
  Recruiter.findOne({email: request.payload.email}, (err, user) => {
    if (err) reply(Boom.badImplementation('Error fetching user'))
    else if (user === null) reply(Boom.badData('user not found'))
    else {
      createToken(user, false)
      .then((resetPasswordJWT) => {
        const redisKey = `resetPasswordJWT:${resetPasswordJWT}`
        redisClient.set(redisKey, '');
        // Expire in 1 day
        redisClient.expire(redisKey, 24 * 60 * 60)
        shootMailResetPassword(user, resetPasswordJWT)
        reply({text: 'mail sent'})
      })
      .catch(() => { reply(Boom.badImplementation('error creating token')) })
    }
  })
}

/**
* @api {post} /api/passwordReset set a new password for user
* @apiGroup Authentification
* @apiName passwordReset
*
* @apiDescription Control a JWT passed in GET params, and set a new
* password for the user identified via the JWT
*
* @apiVersion 0.0.1
* @apiParam {string} password new user password
* @apiParam {string} passwordVerif password verif
* @apiParam {string} token JWT passed from GET to redux.
*
* @apiUse LoginReturn
*/
export const passwordReset = (request, reply) => {
  /*
  * cerify passwords are the same
  * get JWT namespaced from redis
  * get user from JWT
  * hash new password
  * save user with new password
  * delete JWT namespaced
  * Login logic.
  */
  if (request.payload.password !== request.payload.passwordVerif) {
    reply(Boom.badData('passwords does not match'))
  } else {
    const redisKey = `resetPasswordJWT:${request.payload.token}`
    redisClient.get(redisKey, (err, res) => {
      if (err) reply(Boom.badImplementation('error while fetching from redis'))
      else if (res === null) reply(Boom.badData('token not existing in redis'))
      else {
        const dataIntoToken = getJwtData(request.payload.token)
        Recruiter.findOne({
          whireId: dataIntoToken.whireId,
          email: dataIntoToken.email
        }, (err, user) => {
          if (err) reply(Boom.badImplementation('error fetching user'))
          else if (user === null) reply(Boom.badData('Passed token does not contain user related data'))
          else {
            const salt = Bcrypt.genSaltSync(10);
            const hash = Bcrypt.hashSync(request.payload.password, salt);
            user.password = hash
            user.save((err, updatedUser) => {
              if (err) reply(Boom.badImplementation('Error updating user'))
              else {
                const token = createToken(updatedUser)
                redisClient.del(redisKey)
                reply({text: "you have a new password", token})
              }
            })
          }
        })
      }
    })
  }
}
