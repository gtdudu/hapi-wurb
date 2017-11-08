import Boom from 'boom'
import {
  getUserFromToken
} from '../../authentification'
import { redisClient } from '../../config/redis';
import { Recruiter } from './../../models/recruiter'
import _ from 'lodash';

export const getAccounts = (request, reply) => {
   Recruiter.find({}, { email: 1, firstName: 1, lastName: 1 })
   .then(accounts => {
     const data = {};
     const ids = [];

     _.forEach(accounts, account => {
       data[account._id] = account;
       ids.push(account._id);
     })
     reply({data, ids});
   })
  .catch(() => {
    reply(Boom.badData('user not existing'))
  })
}

export const getUserAccount = (request, reply) => {
  // getUserFromToken(request.headers.authorization)
  // .then(user => {
    reply({text: 'data is here', user: {
      email: 'tommy',
      firstName: 'durand',
      lastName: 'fjizea',
      whireId: 'foizejofijze',
      Oauth: [],
      scope: ['base']
    }})
  // })
  // .catch(() => {
  //   reply(Boom.badData('user not existing'))
  // })
}

/**
* @api {delete} /api/account deleteUserAccount
* @apiGroup Account
* @apiName delete user Account
* @apiPermission jwt, base
*
* @apiDescription delete user from DB
*
* @apiVersion 0.0.1
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "text": "user has been deleted",
*     }
*
* @apiError UserNotFound DB Error
*
* @apiErrorExample Error-Response:
*     HTTP/1.1 4xx NOT OK
*     {
*       "error": "User not existing"
*     }
*
*/
export const deleteUserAccount = (request, reply) => {
  const token = request.headers.authorization
  getUserFromToken(token)
  .then(user => {
    redisClient.del(user.whireId, (err, res) => {
      if (err) {
        console.log('error while deleting token', user, err);
      }
      console.log(res);
    })
    user.remove(err => {
      if (err) reply(Boom.badImplementation('error while deleting document.'))
      else {
        reply({text: 'user has been deleted'})
      }
    })
  })
  .catch(() => {
    reply(Boom.badData('user not existing'))
  })
}
